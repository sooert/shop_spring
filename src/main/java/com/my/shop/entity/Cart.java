package com.my.shop.entity;

public class Cart {

    private int cart_idx = 0;
    private String cart_code;
    private String user_code;
    private String item_code;
    private String item_name;
    private String item_img_url;
    private String item_color;
    private String item_size;
    private int total_price;
    private int cart_count;

    public int getCart_idx() {
        return cart_idx;
    }

    public void setCart_idx(int cart_idx) {
        this.cart_idx = cart_idx;
    }

    public String getCart_code() {
        return cart_code;
    }

    public void setCart_code(String cart_code) {
        this.cart_code = cart_code;
    }

    public String getUser_code() {
        return user_code;
    }

    public void setUser_code(String user_code) {
        this.user_code = user_code;
    }

    public String getItem_code() {
        return item_code;
    }

    public void setItem_code(String item_code) {
        this.item_code = item_code;
    }

    public int getCart_count() {
        return cart_count;
    }

    public void setCart_count(int cart_count) {
        this.cart_count = cart_count;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }   

    public String getItem_img_url() {
        return item_img_url;
    }

    public void setItem_img_url(String item_img_url) {
        this.item_img_url = item_img_url;
    }   

    public String getItem_color() {
        return item_color;
    }

    public void setItem_color(String item_color) {
        this.item_color = item_color;
    }   

    public String getItem_size() {
        return item_size;
    }

    public void setItem_size(String item_size) {
        this.item_size = item_size;
    }      

    public int getTotal_price() {
        return total_price;
    }

    public void setTotal_price(int total_price) {
        this.total_price = total_price;
    }
}
