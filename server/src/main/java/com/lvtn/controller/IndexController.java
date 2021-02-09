package com.lvtn.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lvtn.service.DataService;
import com.lvtn.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class IndexController {
    private static class data{
        public String id;
        public int room;

        public data() {
        }
    }
    @Autowired
    private DataService dataService;
    @Autowired
    private RestService restService;

    @GetMapping({"/","/login"})
    public ModelAndView login(){
        return new ModelAndView("login");
    }

    @GetMapping("/register")
    public ModelAndView register(){
        return new ModelAndView("register");
    }

    @GetMapping("/rooms")
    public ModelAndView houseList(){
        return new ModelAndView("hlist").addObject("n", dataService.count());
    }

    @GetMapping("/test")
    public ModelAndView test(){
        return new ModelAndView("test");
    }

    @PostMapping("/tt")
    @ResponseBody
    public String tt(@RequestBody String body){
        return "OK";
    }
}
