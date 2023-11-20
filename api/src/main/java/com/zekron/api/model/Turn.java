package com.zekron.api.model;

import javax.persistence.*;
import java.sql.Time;

@Entity
public class Turn extends BaseEntity  {
    @Column(name = "hour_start", nullable = false)
    private Time hourStart;
    @Column(name = "hour_end", nullable = false)
    private Time hourEnd;
    @Column(name = "has_lunch", nullable = false)
    private Boolean hasLunch;

    public Time getHourStart() {
        return hourStart;
    }

    public void setHourStart(Time hourStart) {
        this.hourStart = hourStart;
    }

    public Time getHourEnd() {
        return hourEnd;
    }

    public void setHourEnd(Time hourEnd) {
        this.hourEnd = hourEnd;
    }

    public Boolean getHasLunch() {
        return hasLunch;
    }

    public void setHasLunch(Boolean hasLunch) {
        this.hasLunch = hasLunch;
    }

    @Override
    public String toString() {
        return "Turn{" +
                "hourStart=" + hourStart +
                ", hourEnd=" + hourEnd +
                ", hasLunch=" + hasLunch +
                '}';
    }
}
