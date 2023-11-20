package com.zekron.api.model;

import javax.persistence.*;

@Entity
public class Scale extends BaseEntity {
    @Column(name = "is_default", nullable = false)
    private Boolean isDefault;

    @ManyToOne
    @JoinColumn(name = "lunch_turn_id")
    private Turn lunchTurn;

    @ManyToOne
    @JoinColumn(name = "general_turn_id")
    private Turn generalTurn;

    public Boolean getDefault() {
        return isDefault;
    }

    public void setDefault(Boolean aDefault) {
        isDefault = aDefault;
    }

    public Turn getLunchTurn() {
        return lunchTurn;
    }

    public void setLunchTurn(Turn lunchTurn) {
        this.lunchTurn = lunchTurn;
    }

    public Turn getGeneralTurn() {
        return generalTurn;
    }

    public void setGeneralTurn(Turn generalTurn) {
        this.generalTurn = generalTurn;
    }

    @Override
    public String toString() {
        return "Scale{" +
                "isDefault=" + isDefault +
                ", lunchTurn=" + lunchTurn +
                ", generalTurn=" + generalTurn +
                '}';
    }
}
