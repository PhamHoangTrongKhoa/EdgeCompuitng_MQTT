package com.lvtn.controller;

import com.lvtn.model.ListReport;
import com.lvtn.model.TimeReport;
import com.lvtn.service.DataService;
import com.lvtn.service.FileStorageService;
import com.lvtn.util.Excel;
import com.lvtn.model.Report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Date;

@Controller
public class FileController {
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private DataService dataService;
    @Autowired
    private Excel excel;
    @PostMapping("/upload")
    public String upload(MultipartFile file){
        fileStorageService.store(file);
        return "OK";
    }

    @GetMapping("/{id}/excel")
    @ResponseBody
    public ResponseEntity<InputStreamResource> create(@PathVariable("id")int id) throws FileNotFoundException {
        Date from = new Date();
        Date to = new Date(from.getTime()+86400000);
        TimeReport rp = dataService.basicReport(id, from, to);
        ListReport lp = dataService.extraReport(id, from, to);
        File file = excel.writeToExcel(rp, lp);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename="+file.getName())
                .body(new InputStreamResource(new FileInputStream(file)));
    }

}
