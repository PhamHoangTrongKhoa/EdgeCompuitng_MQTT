package com.lvtn.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ListInfo {
    public class Value{
        public double data;
        public Date time;

        public Value(double data, Date time) {
            this.data = data;
            this.time = time;
        }
    }
    private List<Value> data;
    private String des;
    private String tag;

    public ListInfo(String des, String tag) {
        this.des = des;
        this.data = new ArrayList<>();
        this.tag = tag;
    }

    public void setDHT(List<DHT> dhtList, int mode){
        List<Value> values = new ArrayList<>();
        if(mode==1){
            for (DHT d:dhtList){
                values.add(new Value(d.getTemp(), d.getDate()));
            }
        }else{
            for (DHT d:dhtList){
                values.add(new Value(d.getHumid(), d.getDate()));
            }
        }
        this.data = values;
    }

    public void setMisc(List<Misc> miscList, int mode){
        List<Value> values = new ArrayList<>();
        if(mode==1){
            for (Misc m:miscList){
                values.add(new Value(m.getSmoke(), m.getDate()));
            }
        }else{
            for (Misc m:miscList){
                values.add(new Value(m.getLight(), m.getDate()));
            }
        }
        this.data = values;
    }

    public List<Value> getData() {
        return data;
    }

    public String getDes() {
        return des;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
