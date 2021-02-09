package com.lvtn.model;

import java.util.Date;

public class TimeInfo {
    private double data;
    private Date time;
    private String des;

    public TimeInfo(double data, Date time, String des) {
        this.data = data;
        this.time = time;
        this.des = des;
    }

    public double getData() {
        return data;
    }

    public Date getTime() {
        return time;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getDes() {
        return des;
    }
}
