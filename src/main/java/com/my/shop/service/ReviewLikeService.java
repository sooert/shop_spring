package com.my.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.ReviewLikeDao;
import com.my.shop.entity.ReviewLike;

@Service
public class ReviewLikeService {

	@Autowired
	ReviewLikeDao reviewLikeDao;

	// 좋아요 생성
	public void reviewLikeAdd(ReviewLike reviewLike) {
		reviewLikeDao.reviewLikeAdd(reviewLike);
	}

	// 좋아요 증가
	public void reviewLikePlus(String review_code) {
		reviewLikeDao.reviewLikePlus(review_code);
	}

	// 좋아요 취소
	public void reviewLikeCancel(String review_code) {
		reviewLikeDao.reviewLikeCancel(review_code);
	}

}
