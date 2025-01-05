package com.my.shop.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.ItemLike;

@Repository
public class ItemLikeDao {

    @Autowired
    SqlSession sqlSession;

    // 아이템 좋아요 생성
    public void itemLikeCreate(ItemLike itemLike) {
        sqlSession.insert("ItemLikeMapper.itemLikeCreate", itemLike);
    }

    // 아이템 좋아요 증가
    public void itemLikePlus(ItemLike itemLike) {
        sqlSession.update("ItemLikeMapper.itemLikePlus", itemLike);
    }

    // 아이템 좋아요 감소
    public void itemLikeMinus(ItemLike itemLike) {
        sqlSession.update("ItemLikeMapper.itemLikeMinus", itemLike);
    }

    // 아이템 좋아요 삭제
    public void itemLikeDelete(ItemLike itemLike) {
        sqlSession.delete("ItemLikeMapper.itemLikeDelete", itemLike);
    }

    // 사용자별 찜 목록 조회
    public List<Map<String, Object>> findByUserNick(String user_nick) {
        return sqlSession.selectList("ItemLikeMapper.findByUserNick", user_nick);
    }

    // 좋아요 상태 확인
    public int checkLikeStatus(ItemLike itemLike) {
        return sqlSession.selectOne("ItemLikeMapper.checkLikeStatus", itemLike);
    }
    

}
