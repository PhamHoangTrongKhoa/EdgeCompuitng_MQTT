package com.lvtn.controller;

import com.lvtn.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MainController {

    @Autowired
    private DataService dataService;

    @GetMapping("/manage")
    public ModelAndView main(){
        return new ModelAndView("manager");
    }
}
