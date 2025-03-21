package com.my.shop.dao;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

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

    ////////////// 주문 취소 ///////////////////////////

    // 주문 취소 처리
    public void orderCancel(String buyCode) {
        sqlSession.update("BuyMapper.orderCancel", buyCode);
    }

    // 상품 코드와 사용자 인덱스로 구매 정보 조회
    public Buy findByItemCodeAndUserIdx(String itemCode, int userIdx) {
        Map<String, Object> params = new HashMap<>();
        params.put("itemCode", itemCode);
        params.put("userIdx", userIdx);
        return sqlSession.selectOne("BuyMapper.findByItemCodeAndUserIdx", params);
    }

    ////////////// 주문 확정 ///////////////////////////

    // 주문 확정
    public void orderConfirm(String buy_code) {
        sqlSession.update("BuyMapper.orderConfirm", buy_code);
    }

    ////////////// 주문 삭제 ///////////////////////////

    // 주문 삭제
    public void deleteBuy(String buy_code) {
        sqlSession.delete("BuyMapper.deleteBuy", buy_code);
    }

    // buy_code로 주문 정보 조회
    public Buy findByBuyCode(String buyCode) {
        return sqlSession.selectOne("BuyMapper.findByBuyCode", buyCode);
    }

    ////////////// 구매 상품 정보 로드 ///////////////////////////

    // 구매 상품 정보 로드
    public Buy buyItemDetail(String buyCode) {
        return sqlSession.selectOne("BuyMapper.buyItemDetail", buyCode);
    }

    // buy_code로 item_code 조회
    public String getItemCodeByBuyCode(String buyCode) {
        return sqlSession.selectOne("BuyMapper.getItemCodeByBuyCode", buyCode);
    }
}
