package com.my.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.ReviewImgDao;
import com.my.shop.entity.ReviewImg;

@Service
public class ReviewImgService {

    @Autowired
    ReviewImgDao reviewImgDao;

    ///////////////// 리뷰 이미지 추가 /////////////////////

    // 리뷰 이미지 추가
    public void reviewImgAdd(ReviewImg reviewImg) {
        reviewImgDao.reviewImgAdd(reviewImg);
    }

}
