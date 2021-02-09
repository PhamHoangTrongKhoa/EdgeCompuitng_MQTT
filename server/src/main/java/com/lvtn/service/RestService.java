package com.lvtn.service;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.Map;

@Service
public class RestService {
    private RestTemplate restTemplate;

    public RestService(RestTemplateBuilder restTemplateBuilder){
        this.restTemplate = restTemplateBuilder
                .setConnectTimeout(Duration.ofSeconds(5))
                .build();
    }

    public String getRequest(String url){
        ResponseEntity<String> response = this.restTemplate.getForEntity(url, String.class);
        if(response.getStatusCode()== HttpStatus.OK){
            return response.getBody();
        }else{
            return null;
        }
    }

    public HttpStatus postRequest(String url, Map<String, Object> data){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(data, headers);
        ResponseEntity<String> response = this.restTemplate.postForEntity(url, entity, String.class);
        return response.getStatusCode();
    }
}
