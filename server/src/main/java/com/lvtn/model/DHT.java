package com.lvtn.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class DHT {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double temp;
    private double humid;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "house_id", nullable = false)
    private Room room;
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date date;
    private boolean sync;

    public DHT() {
    }

    public DHT(double temp, double humid, Room room) {
        this.temp = temp;
        this.humid = humid;
        this.date = new Date();
        this.room = room;
    }

    public DHT(double temp, double humid,Date date, Room room) {
        this.temp = temp;
        this.humid = humid;
        this.date = date;
        this.room = room;
    }

    public double getTemp() {
        return temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }

    public double getHumid() {
        return humid;
    }

    public void setHumid(double humid) {
        this.humid = humid;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public boolean isSync() {
        return sync;
    }

    public void setSync(boolean sync) {
        this.sync = sync;
    }
}
