package com.lvtn.controller;

import com.lvtn.service.DataService;
import com.lvtn.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/room")
public class ReportController {
    @Autowired
    private DataService dataService;
    @Autowired
    private Utils utils;
    @GetMapping("/{id}/report/basic")
    public String basicReport(@PathVariable("id")int id,
                              @RequestParam("from")long dFrom,
                              @RequestParam("to")long dTo){
        return utils.objectMapper(dataService.basicReport(id, new Date(dFrom), new Date(dTo)));
    }

    @GetMapping("/{id}/report/extra")
    public String extraReport(@PathVariable("id")int id,
                              @RequestParam("from")long dFrom,
                              @RequestParam("to")long dTo){
        return utils.objectMapper(dataService.extraReport(id, new Date(dFrom), new Date(dTo)));
    }
}
