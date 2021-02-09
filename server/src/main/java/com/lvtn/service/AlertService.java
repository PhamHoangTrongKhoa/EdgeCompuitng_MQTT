package com.lvtn.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class AlertService {
    private static final int MAX = 4;
    private LoadingCache<String, Integer> cache;
    public AlertService(){
        super();
        cache = CacheBuilder.newBuilder()
                .expireAfterWrite(5, TimeUnit.MINUTES).build(new CacheLoader<String, Integer>() {
                    @Override
                    public Integer load(String s) throws Exception {
                        return 0;
                    }
                });
    }

    public void load(String key){
        int n = 0;
        try {
            n = cache.get(key);
        }catch (ExecutionException e){
            n = 0;
        }
        n++;
        cache.put(key, n);
    }

    public void clear(String key){
        cache.invalidate(key);
    }

    public boolean alert(String key){
        try {
            return cache.get(key)>= MAX;
        }catch (ExecutionException e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    public int get(String key){
        try {
            return cache.get(key);
        } catch (ExecutionException e) {
            return 0;
        }
    }
}
