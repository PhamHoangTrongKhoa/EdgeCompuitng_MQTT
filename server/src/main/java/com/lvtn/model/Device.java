package com.lvtn.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @OneToMany(mappedBy = "device")
    private Set<RoomDevice> rooms;

    public Device() {
    }

    public Device(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<RoomDevice> getRooms() {
        return rooms;
    }

    public void setRooms(Set<RoomDevice> rooms) {
        this.rooms = rooms;
    }
}
