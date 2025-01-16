package com.my.shop.entity;

import java.time.LocalDateTime;

public class BodySpecs {

    private int body_idx = 0;
    private String user_code;
    private int height;
    private int pants_size;
    private String top_size;
    private String shoes_size;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

    public int getBody_idx() {
        return body_idx;
    }

    public void setBody_idx(int body_idx) {
        this.body_idx = body_idx;
    }

    public String getUser_code() {
        return user_code;
    }

    public void setUser_code(String user_code) {
        this.user_code = user_code;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getPants_size() {
        return pants_size;
    }

    public void setPants_size(int pants_size) {
        this.pants_size = pants_size;
    }

    public String getTop_size() {
        return top_size;
    }

    public void setTop_size(String top_size) {
        this.top_size = top_size;
    }

    public String getShoes_size() {
        return shoes_size;
    }

    public void setShoes_size(String shoes_size) {
        this.shoes_size = shoes_size;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }

}
