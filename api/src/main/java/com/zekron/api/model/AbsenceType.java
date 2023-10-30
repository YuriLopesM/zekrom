package com.zekron.api.model;

import java.time.LocalDate;

public class AbsenceType extends BaseEntity {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "AbsenceType{" +
                "name='" + name + '\'' +
                '}';
    }
}
