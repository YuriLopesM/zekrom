package com.zekron.api.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User extends BaseEntity {
    @Column(name = "document", length = 20, nullable = false)
    private String document;
    @Column(name = "name", length = 50, nullable = false)
    private String name;
    @Column(name = "is_admin", nullable = false)
    private Boolean isAdmin;

    @ManyToOne
    @JoinColumn(name = "sector_id")
    private Sector sector;

    @ManyToOne
    @JoinColumn(name = "office_id")
    private Office office;

    @ManyToOne
    @JoinColumn(name = "scale_id")
    private Scale scale;

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public Sector getSector() {
        return sector;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }

    public Office getOffice() {
        return office;
    }

    public void setOffice(Office office) {
        this.office = office;
    }

    public Scale getScale() {
        return scale;
    }

    public void setScale(Scale scale) {
        this.scale = scale;
    }

    @Override
    public String toString() {
        return "User{" +
                "document='" + document + '\'' +
                ", name='" + name + '\'' +
                ", isAdmin=" + isAdmin +
                ", sector=" + sector +
                ", office=" + office +
                ", scale=" + scale +
                '}';
    }
}
