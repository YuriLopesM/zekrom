package com.zekron.api.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class AbsenceType extends BaseEntity {
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @OneToMany(mappedBy = "type")
    private List<Absence> absences = new ArrayList<Absence>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Absence> getAbsences() {
        return absences;
    }

    public void setAbsences(List<Absence> absences) {
        this.absences = absences;
    }

    @Override
    public String toString() {
        return "AbsenceType{" +
                "name='" + name + '\'' +
                ", absences=" + absences +
                '}';
    }
}
