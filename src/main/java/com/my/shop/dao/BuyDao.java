package com.my.shop.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.my.shop.entity.Buy;

@Repository
public class BuyDao {
    
    @Autowired 
    SqlSession sqlSession;

    ///////////////// 구매 목록 생성 /////////////////////

    // 구매 목록 생성
    public void buyAdd(Buy buy) {
        sqlSession.insert("BuyMapper.buyAdd", buy);
    }

    ///////////////// 구매 횟수 전체 조회 /////////////////////

    // 구매 횟수 전체 조회
    public int buyCount() {
        return sqlSession.selectOne("BuyMapper.buyCount");
    }

    ///////////////// 구매 횟수 증가 /////////////////////

    // 구매 횟수 증가
    public void buyCountUpdate(Map<String, Object> map) {
        sqlSession.update("BuyMapper.buyCountUpdate", map);
    }

     ///////////////// 회원 구매 목록 조회 /////////////////////

    // 회원 구매 목록 상세 조회
    public List<Map<String, Object>> buyListDetail(int user_idx) {
        return sqlSession.selectList("BuyMapper.buyListDetail", user_idx);
    }
    
    ////////////// 상품별 구매 횟수 조회 ///////////////////////////

    // 상품별 구매 횟수 조회
    public int getItemBuyCount(String item_code) {
        return sqlSession.selectOne("BuyMapper.getItemBuyCount", item_code);
    }

}
