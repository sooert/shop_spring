package com.my.shop.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.ItemDao;
import com.my.shop.entity.Item;

@Service
public class ItemService {

    @Autowired
    ItemDao itemDao;

    // 상품 생성
    public void create(Item item) {
        itemDao.create(item);
    }

    // 상품 조회
    public Item findByCode(String item_code) {
        return itemDao.findByCode(item_code);
    }

    // 상품 총 개수
    public int totalCount() {
        return itemDao.totalCount();
    }

    // 상품 목록
    public List<Item> findAll(HashMap<String, Object> params) {
        return itemDao.findAll(params);
    }

    // 상품 수정
    public void update(Item item) {
        itemDao.update(item);
    }
}
