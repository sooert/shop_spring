package com.my.shop.entity;

import java.util.Date;

public class ItemLike {

    private int item_like_idx;
    private String item_code;
    private String user_nick;
    private Date date;

    public int getItem_like_idx() {
        return item_like_idx;
    }

    public void setItem_like_idx(int item_like_idx) {
        this.item_like_idx = item_like_idx;
    }

    public String getItem_code() {
        return item_code;
    }

    public void setItem_code(String item_code) {
        this.item_code = item_code;
    }

    public String getUser_nick() {
        return user_nick;
    }

    public void setUser_nick(String user_nick) {
        this.user_nick = user_nick;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
