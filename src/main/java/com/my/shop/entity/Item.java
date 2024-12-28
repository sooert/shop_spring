package com.my.shop.entity;

public class Item {

    private int item_idx = 0;
    private String item_code = null;
    private int user_idx = 0;
    private String name = null;
    private String category = null;
    private String content = null;
    private String item_img_url = null;
    private String company = null;
    private int price = 0;
    private double discount = 0;
    private double point = 0;
    private String created_date = null;   


    public int getItem_idx() {
        return item_idx;
    }

    public void setItem_idx(int item_idx) {
        this.item_idx = item_idx;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getItem_img_url() {
        return item_img_url;
    }

    public void setItem_img_url(String item_img_url) {
        this.item_img_url = item_img_url;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public double getPoint() {
        return point;
    }

    public void setPoint(double point) {
        this.point = point;
    }

    public String getCreated_date() {
        return created_date;
    }

    public void setCreated_date(String created_date) {
        this.created_date = created_date;
    }
    
}
