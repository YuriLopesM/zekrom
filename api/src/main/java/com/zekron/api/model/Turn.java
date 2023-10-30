package com.zekron.api.model;

import java.sql.Time;

public class Turn extends BaseEntity {
    private Time hourStart;
    private Time hourEnd;
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
