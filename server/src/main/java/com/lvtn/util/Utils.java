package com.lvtn.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lvtn.model.RS;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class Utils {
    static private Logger log = LogManager.getLogger();
    public BCryptPasswordEncoder encoder(int n){
        return new BCryptPasswordEncoder(n);
    }

    public String objectMapper(Object object){
        ObjectMapper mapper = new ObjectMapper();
        String json = "";
        try {
            json = mapper.writeValueAsString(object);
        }catch (JsonProcessingException jpe){
            log.info(jpe.getMessage());
        }
        return json;
    }

    public static RS getFromFile(File file){
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(file, RS.class);
        } catch (IOException e) {
            log.info(e.getMessage());
            return null;
        }
    }

}
