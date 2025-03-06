package com.my.shop.entity;

public class ReviewLike {

	private int review_like_idx;
	private String review_code;
	private int review_like_count;
	private String date;

	public int getReview_like_idx() {
		return review_like_idx;
	}
	public void setReview_like_idx(int review_like_idx) {
		this.review_like_idx = review_like_idx;
	}

	public String getReview_code() {
		return review_code;
	}
	public void setReview_code(String review_code) {
		this.review_code = review_code;
	}

	public int getReview_like_count() {
		return review_like_count;
	}
	public void setReview_like_count(int review_like_count) {
		this.review_like_count = review_like_count;
	}

	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
}
