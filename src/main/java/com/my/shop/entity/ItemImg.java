package com.my.shop.entity;

public class ItemImg {

    private int item_img_idx = 0;
    private int item_idx = 0;
    private String item_img_url = null;
    private String created_date = null;

    public int getItem_img_idx() {
        return item_img_idx;
    }

    public void setItem_img_idx(int item_img_idx) {
        this.item_img_idx = item_img_idx;
    }

    public int getItem_idx() {
        return item_idx;
    }

    public void setItem_idx(int item_idx) {
        this.item_idx = item_idx;
    }

    public String getItem_img_url() {
        return item_img_url;
    }

    public void setItem_img_url(String item_img_url) {
        this.item_img_url = item_img_url;
    }

    public String getCreated_date() {
        return created_date;
    }

    public void setCreated_date(String created_date) {
        this.created_date = created_date;
    }
}
