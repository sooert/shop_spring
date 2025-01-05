package com.my.shop.entity;

public class Review {

    private int review_idx;
    private String review_code;
    private String item_code;
    private String user_nick;
    private String title;
    private String content;
    private String item_category;
    private int item_price;
    private String review_img_url;
    private int review_star;
    private String date;

    public int getReview_idx() {
        return review_idx;
    }

    public void setReview_idx(int review_idx) {
        this.review_idx = review_idx;
    }

    public String getReview_code() {
        return review_code;
    }

    public void setReview_code(String review_code) {
        this.review_code = review_code;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getItem_category() {
        return item_category;
    }

    public void setItem_category(String item_category) {
        this.item_category = item_category;
    }

    public int getItem_price() {
        return item_price;
    }

    public void setItem_price(int item_price) {
        this.item_price = item_price;
    }

    public String getReview_img_url() {
        return review_img_url;
    }

    public void setReview_img_url(String review_img_url) {
        this.review_img_url = review_img_url;
    }

    public int getReview_star() {
        return review_star;
    }

    public void setReview_star(int review_star) {
        this.review_star = review_star;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
    

}
