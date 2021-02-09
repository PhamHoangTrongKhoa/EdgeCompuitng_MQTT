package com.lvtn.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class StandardValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "room_id")
    private Room room;
    private double t;
    private double h;
    private double s;
    private double l;

    public StandardValue() {
    }

    public StandardValue(Room room, double t, double h, double s, double l) {
        this.room = room;
        this.t = t;
        this.h = h;
        this.s = s;
        this.l = l;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
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
}
