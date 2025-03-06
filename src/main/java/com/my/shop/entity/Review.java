package com.my.shop.entity;

public class Review {

    private int review_idx;
    private String review_code;
    private String item_code;
    private String buy_code;
    private String user_nick;
    private String satisfaction;
    private String colors;
    private String sizes;
    private String content;
    private String review_img_url;
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

    public String getBuy_code() {
        return buy_code;
    }

    public void setBuy_code(String buy_code) {
        this.buy_code = buy_code;
    }

    public String getUser_nick() {
        return user_nick;
    }

    public void setUser_nick(String user_nick) {
        this.user_nick = user_nick;
    }

    public String getSatisfaction() {
        return satisfaction;
    }

    public void setSatisfaction(String satisfaction) {
        this.satisfaction = satisfaction;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getColors() {
        return colors;
    }

    public void setColors(String colors) {
        this.colors = colors;
    }

    public String getSizes() {
        return sizes;
    }

    public void setSizes(String sizes) {
        this.sizes = sizes;
    }

    public String getReview_img_url() {
        return review_img_url;
    }

    public void setReview_img_url(String review_img_url) {
        this.review_img_url = review_img_url;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
    

}
