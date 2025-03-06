package com.my.shop.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.Review;

import java.util.List;

@Repository
public class ReviewDao {

    @Autowired
    SqlSession sqlSession;

    ///////////////// 리뷰 생성 /////////////////////

    // 리뷰 생성
    public void reviewAdd(Review review) {
        sqlSession.insert("ReviewMapper.reviewAdd", review);
    }

    // 유저 닉네임으로 닉네임 조회
    public List<Review> findByUserNick(Review review) {
        return sqlSession.selectList("ReviewMapper.findByUserNick", review);
    }

    // 상품 코드로 리뷰 조회
    public List<Review> findByItemCode(Review review) {
        return sqlSession.selectList("ReviewMapper.findByItemCode", review);
    }
}
