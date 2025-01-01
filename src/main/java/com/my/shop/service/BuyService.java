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
    
    ///////////////// 구매 횟수 전체 조회 /////////////////////

    // 구매 횟수 전체 조회
    public int buyCount() {
        return buyDao.buyCount();
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
}
