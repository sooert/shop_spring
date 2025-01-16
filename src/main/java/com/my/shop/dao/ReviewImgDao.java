package com.my.shop.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.ReviewImg;

@Repository
public class ReviewImgDao {

    @Autowired
    SqlSession sqlSession;

    ///////////////// 리뷰 이미지 추가 /////////////////////

    // 리뷰 이미지 추가
    public void reviewImgAdd(ReviewImg reviewImg) {
        sqlSession.insert("ReviewImgMapper.reviewImgAdd", reviewImg);
    }
}
