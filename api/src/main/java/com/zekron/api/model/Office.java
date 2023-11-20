package com.zekron.api.model;

import javax.persistence.*;

@Entity
public class Office extends BaseEntity {
    @Column(name = "name", length = 50, nullable = false)
    private String name;
    @Column(name = "city", length = 80, nullable = false)
    private String city;
    @Column(name = "state", length = 2, nullable = false)
    private String state;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Office{" +
                "name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
