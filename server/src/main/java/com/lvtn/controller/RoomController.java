package com.lvtn.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.lvtn.exception.BadRequestException;
import com.lvtn.model.*;
import com.lvtn.service.DataService;
import com.lvtn.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/room")
public class RoomController {

    private static class DeviceData{
        public String id;
        public int room;

        public DeviceData() {
        }
    }

    private static class DeviceStatus{
        public String id;
        public int room;
        public String status;

        public DeviceStatus() {
        }
    }

    private static class SDData{
        private int id;
        private double t;
        private double h;
        private double s;
        private double l;

        public SDData() {
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public double getT() {
            return t;
        }

        public void setT(double t) {
            this.t = t;
        }

        public double getH() {
            return h;
        }

        public void setH(double h) {
            this.h = h;
        }

        public double getS() {
            return s;
        }

        public void setS(double s) {
            this.s = s;
        }

        public double getL() {
            return l;
        }

        public void setL(double l) {
            this.l = l;
        }
    }
    @Autowired
    private DataService dataService;
    @Autowired
    private RestService restService;

    @GetMapping("/{id}")
    public ModelAndView house(@PathVariable int id){
        Room room = dataService.getRoom(id);
        return new ModelAndView("main").addObject("room", room);
    }

    @GetMapping("/{id}/weather")
    public ModelAndView weather(@PathVariable int id){
        Room room = dataService.getRoom(id);
        return new ModelAndView("weather").addObject("room", room);
    }

    @GetMapping("/{id}/misc")
    public ModelAndView misc(@PathVariable int id){
        Room room = dataService.getRoom(id);
        return new ModelAndView("misc").addObject("room", room);
    }

    @GetMapping("/{id}/report")
    public ModelAndView report(@PathVariable int id){
        Room room = dataService.getRoom(id);
        ModelAndView report = new ModelAndView("report");
        report.addObject("room", room);
        return report;
    }
    @GetMapping("/{id}/setting")
    public ModelAndView setting(@PathVariable int id){
        Room room = dataService.getRoom(id);
        ModelAndView setting = new ModelAndView("setting").addObject("room", room);
        setting.addObject("rs", dataService.getSD(id));
        return setting;
    }

    @GetMapping("/sd")
    @ResponseBody
    public String getSD(@RequestParam("id") int id){
        ObjectMapper mapper = new ObjectMapper();
        StandardValue sd = dataService.getSD(id);
        SimpleModule module = new SimpleModule();
        module.addSerializer(StandardValue.class, new SDSerializer());
        mapper.registerModule(module);
        try {
            return mapper.writeValueAsString(sd);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/setting/change")
    @ResponseBody
    public String change(@RequestBody String body) throws BadRequestException{
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(body);
        try {
            SDData data = mapper.readValue(body, SDData.class);
            if(dataService.changeSD(data.getId(), data.getT(), data.getH(), data.getS(), data.getL())){
                return mapper.writeValueAsString(new JsonResponse("OK"));
            }else{
                throw new BadRequestException("StandardValue not found");
            }
        }catch (JsonProcessingException e){
            e.printStackTrace();
            throw new BadRequestException("Unexpected error!");

        }
    }

    @GetMapping("/{id}/device")
    public ModelAndView device(@PathVariable("id") int id){
        Room room = dataService.getRoom(id);
        return new ModelAndView("device").addObject("room", room)
                .addObject("dvs", dataService.getDeviceList(id));
    }

    @PostMapping("/device")
    @ResponseBody
    public String changeDeviceState(@RequestBody String body) throws BadRequestException{
        ObjectMapper mapper = new ObjectMapper();
        try {
            DeviceStatus data = mapper.readValue(body, DeviceStatus.class);
            if(dataService.changeState(data.id, data.status)){
                return mapper.writeValueAsString(new JsonResponse("OK"));
            }else{
                throw new BadRequestException("Device not found!");
            }

        }catch (JsonProcessingException e){
            e.printStackTrace();
            throw new BadRequestException("Unexpected error!");
        }
    }

    @PostMapping("/device/change")
    @ResponseBody
    public String changeDevice(@RequestBody String body)throws BadRequestException{
        ObjectMapper mapper = new ObjectMapper();
        try {
            DeviceData deviceData = mapper.readValue(body, DeviceData.class);
            RoomDevice device = dataService.getDevice(deviceData.id);
            Map<String, Object> map = new HashMap<>();
            map.put("id", deviceData.id);
            map.put("room", deviceData.room);
            String s = device.getStatus().equals("ON")?"OFF":"ON";
            map.put("status", s);
            HttpStatus status = restService.postRequest("http://192.168.137.1:4000/receive_device",map);
            if(status==HttpStatus.OK){
                dataService.changeState(deviceData.id, s);
                return mapper.writeValueAsString(new JsonResponse("OK"));
            }else{
                throw new BadRequestException("Error");
            }
        }catch (JsonProcessingException e){
            throw new BadRequestException(e.getMessage());
        }
    }
}
