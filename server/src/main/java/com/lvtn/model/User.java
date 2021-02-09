package com.lvtn.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true,nullable = false)
    private String name;
    @Column(unique = true,nullable = false)
    private String mail;
    @Column(nullable = false)
    private String password;
    private String role;

    public User() {
    }

    public User(String name, String mail, String password) {
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.role = "USER";
    }

    public User(String name, String mail, String password, String role, String permission) {
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.role = role;
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

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<String> getRoleList(){
        if(this.role.length()>0){
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }
}
