package com.lvtn.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class Misc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double smoke;
    private double light;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "house_id", nullable = false)
    private Room room;
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date date;
    private boolean sync;

    public Misc() {
    }

    public Misc(double smoke, double light, Room room) {
        this.smoke = smoke;
        this.light = light;
        this.date = new Date();
        this.room = room;
    }

    public Misc(double smoke, double light, Date date, Room room) {
        this.smoke = smoke;
        this.light = light;
        this.date = date;
        this.room = room;
    }

    public double getSmoke() {
        return smoke;
    }

    public void setSmoke(double smoke) {
        this.smoke = smoke;
    }

    public double getLight() {
        return light;
    }

    public void setLight(double light) {
        this.light = light;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isSync() {
        return sync;
    }

    public void setSync(boolean sync) {
        this.sync = sync;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
