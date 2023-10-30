package com.zekron.api.model;

public class Sector extends BaseEntity {
    private Long scaleId;
    private String name;

    public Long getScaleId() {
        return scaleId;
    }

    public void setScaleId(Long scaleId) {
        this.scaleId = scaleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Sector{" +
                "scaleId=" + scaleId +
                ", name='" + name + '\'' +
                '}';
    }
}
