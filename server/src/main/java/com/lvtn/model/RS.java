package com.lvtn.model;

public class RS {
    private String name;
    private double t;
    private double h;
    private double s;
    private double l;
    public RS() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return getT()+"-"+getH()+"-"+getS()+"-"+getL();
    }
}
