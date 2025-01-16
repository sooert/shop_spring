package com.my.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.ReviewDao;
import com.my.shop.entity.Review;

@Service
public class ReviewService {

    @Autowired
    ReviewDao reviewDao;

    ///////////////// 리뷰 생성 /////////////////////

    // 리뷰 생성
    public void reviewAdd(Review review) {
        reviewDao.reviewAdd(review);
    }

}
