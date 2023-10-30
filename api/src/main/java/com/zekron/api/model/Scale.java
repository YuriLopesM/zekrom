package com.zekron.api.model;

public class Scale extends BaseEntity {
    private Long generalTurnId;
    private Long lunchTurnId;
    private Boolean isDefault;

    public Long getGeneralTurnId() {
        return generalTurnId;
    }

    public void setGeneralTurnId(Long generalTurnId) {
        this.generalTurnId = generalTurnId;
    }

    public Long getLunchTurnId() {
        return lunchTurnId;
    }

    public void setLunchTurnId(Long lunchTurnId) {
        this.lunchTurnId = lunchTurnId;
    }

    public Boolean getDefault() {
        return isDefault;
    }

    public void setDefault(Boolean aDefault) {
        isDefault = aDefault;
    }

    @Override
    public String toString() {
        return "Scale{" +
                "generalTurnId=" + generalTurnId +
                ", lunchTurnId=" + lunchTurnId +
                ", isDefault=" + isDefault +
                '}';
    }
}
