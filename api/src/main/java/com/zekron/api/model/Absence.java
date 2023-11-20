package com.zekron.api.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Absence extends BaseEntity{
    @Column(name = "justification", length = 512, nullable = false)
    private String justification;
    @Column(name = "date_start", nullable = false)
    private LocalDate dateStart;
    @Column(name = "date_end", nullable = true)
    private LocalDate dateEnd;
    @Column(name = "hour_start", nullable = true)
    private LocalDate hourStart;
    @Column(name = "hour_end", nullable = true)
    private LocalDate hourEnd;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private AbsenceType type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public LocalDate getDateStart() {
        return dateStart;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDate getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDate dateEnd) {
        this.dateEnd = dateEnd;
    }

    public LocalDate getHourStart() {
        return hourStart;
    }

    public void setHourStart(LocalDate hourStart) {
        this.hourStart = hourStart;
    }

    public LocalDate getHourEnd() {
        return hourEnd;
    }

    public void setHourEnd(LocalDate hourEnd) {
        this.hourEnd = hourEnd;
    }

    public AbsenceType getType() {
        return type;
    }

    public void setType(AbsenceType type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    @Override
    public String toString() {
        return "Absence{" +
                "justification='" + justification + '\'' +
                ", dateStart=" + dateStart +
                ", dateEnd=" + dateEnd +
                ", hourStart=" + hourStart +
                ", hourEnd=" + hourEnd +
                ", type=" + type +
                ", user=" + user +
                '}';
    }
}
