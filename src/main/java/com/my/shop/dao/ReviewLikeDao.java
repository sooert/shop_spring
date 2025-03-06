package com.my.shop.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.ReviewLike;
@Repository
public class ReviewLikeDao {

	@Autowired
    SqlSession sqlSession;

    // 좋아요 생성
    public void reviewLikeAdd(ReviewLike reviewLike) {
        sqlSession.insert("ReviewLikeMapper.reviewLikeAdd", reviewLike);
    }

    // 좋아요 증가
    public void reviewLikePlus(String review_code) {
        sqlSession.update("ReviewLikeMapper.reviewLikePlus", review_code);
    }

    // 좋아요 취소
    public void reviewLikeCancel(String review_code) {
        sqlSession.update("ReviewLikeMapper.reviewLikeCancel", review_code);
    }


}
