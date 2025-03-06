package com.my.shop.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.BuyDao;
import com.my.shop.entity.Buy;

@Service
public class BuyService {

    @Autowired
    BuyDao buyDao;

    ///////////////// 구매 목록 생성 /////////////////////

    // 구매 목록 생성
    public void buyAdd(Buy buy) {
        buyDao.buyAdd(buy);
    }

    ///////////////// 구매 횟수 증가 /////////////////////

    // 구매 횟수 증가
    public void buyCountUpdate(Map<String, Object> map) {
        buyDao.buyCountUpdate(map);
    }

    ///////////////// 회원 구매 목록 조회 /////////////////////

    // 회원 구매 목록 상세 조회
    public List<Map<String, Object>> buyListDetail(int user_idx) {
        return buyDao.buyListDetail(user_idx);
    }

    ///////////////// 상품별 구매 횟수 조회 /////////////////////

    // 상품별 구매 횟수 조회
    public int getItemBuyCount(String item_code) {
        return buyDao.getItemBuyCount(item_code);
    }

    ///////////////// 주문 취소 /////////////////////

    // 주문 취소 처리
    public void orderCancel(String buyCode) {
        buyDao.orderCancel(buyCode);
    }

    // 상품 코드와 사용자 인덱스로 구매 정보 조회
    public Buy findByItemCodeAndUserIdx(String item_code, int user_idx) {
        return buyDao.findByItemCodeAndUserIdx(item_code, user_idx);
    }

    ////////////// 주문 확정 /////////////////////

    // 주문 확정
    public void orderConfirm(String buy_code) {
        buyDao.orderConfirm(buy_code);
    }

    ////////////// 주문 삭제 /////////////////////

    // 주문 삭제
    public void deleteBuy(String buy_code) {
        buyDao.deleteBuy(buy_code);
    }

    // buy_code로 주문 정보 조회
    public Buy findByBuyCode(String buyCode) {
        return buyDao.findByBuyCode(buyCode);
    }

    ////////////// 구매 상품 정보 로드 /////////////////////

    // 구매 상품 정보 로드
    public Buy buyItemDetail(String buyCode) {
        return buyDao.buyItemDetail(buyCode);
    }

    // buy_code로 item_code 조회
    public String getItemCodeByBuyCode(String buyCode) {
        return buyDao.getItemCodeByBuyCode(buyCode);
    }
}
