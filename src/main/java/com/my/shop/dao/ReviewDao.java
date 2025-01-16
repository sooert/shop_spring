package com.my.shop.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.Review;

@Repository
public class ReviewDao {

    @Autowired
    SqlSession sqlSession;

    ///////////////// 리뷰 생성 /////////////////////

    // 리뷰 생성
    public void reviewAdd(Review review) {
        sqlSession.insert("ReviewMapper.reviewAdd", review);
    }
}
