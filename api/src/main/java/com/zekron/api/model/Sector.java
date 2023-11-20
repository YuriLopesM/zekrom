package com.zekron.api.model;

import javax.persistence.*;

@Entity
public class Sector extends BaseEntity {
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "scale_id")
    private Scale scale;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Scale getScale() {
        return scale;
    }

    public void setScale(Scale scale) {
        this.scale = scale;
    }

    @Override
    public String toString() {
        return "Sector{" +
                "name='" + name + '\'' +
                ", scale=" + scale +
                '}';
    }
}
