package com.my.shop.service;

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

    // 상품 목록
    public List<Item> findAll() {
        return itemDao.findAll(); 
    }

    // 상품 수정
    public void update(Item item) {
        itemDao.update(item);
    }

    // 상품 상세 조회
    public Item detailItem(String item_code) {
        return itemDao.detailItem(item_code);
    }

}
