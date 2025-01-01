package com.my.shop.entity;

import java.util.Date;

public class Buy {
    
    private int buy_idx;
    private String buy_code;
    private String item_code;
    private int user_idx;
    private int quantity;
    private String color;
    private String size;
    private Date buy_date;


    public int getBuy_idx() {
        return buy_idx;
    }

    public void setBuy_idx(int buy_idx) {
        this.buy_idx = buy_idx;
    }

    public String getBuy_code() {
        return buy_code;
    }

    public void setBuy_code(String buy_code) {
        this.buy_code = buy_code;
    }

    public String getItem_code() {
        return item_code;
    }

    public void setItem_code(String item_code) {
        this.item_code = item_code;
    }

    public int getUser_idx() {
        return user_idx;
    }

    public void setUser_idx(int user_idx) {
        this.user_idx = user_idx;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Date getBuy_date() {
        return buy_date;
    }

    public void setBuy_date(Date buy_date) {
        this.buy_date = buy_date;
    }

}
