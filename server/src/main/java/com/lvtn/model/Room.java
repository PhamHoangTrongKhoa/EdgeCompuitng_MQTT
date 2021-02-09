package com.lvtn.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @OneToMany(mappedBy = "room")
    private List<DHT> dhtList;
    @OneToMany(mappedBy = "room")
    private List<Misc> miscList;
    @OneToMany(mappedBy = "room")
    private Set<RoomDevice> devices;
    public Room() {
    }

    public Room(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public List<DHT> getDhtList() {
        return dhtList;
    }

    public void setDhtList(List<DHT> dhtList) {
        this.dhtList = dhtList;
    }

    public List<Misc> getMiscList() {
        return miscList;
    }

    public void setMiscList(List<Misc> miscList) {
        this.miscList = miscList;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Set<RoomDevice> getDevices() {
        return devices;
    }

    public void setDevices(Set<RoomDevice> devices) {
        this.devices = devices;
    }
}
