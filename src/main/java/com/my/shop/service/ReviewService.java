package com.my.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.ReviewDao;
import com.my.shop.entity.Review;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    ReviewDao reviewDao;

    ///////////////// 리뷰 생성 /////////////////////

    // 리뷰 생성
    public void reviewAdd(Review review) {
        reviewDao.reviewAdd(review);
    }

    // 유저 닉네임으로 닉네임 조회
    public List<Review> findByUserNick(Review review) {
        return reviewDao.findByUserNick(review);
    }

    // 상품 코드로 리뷰 조회
    public List<Review> findByItemCode(Review review) {
        return reviewDao.findByItemCode(review);
    }
}
