package com.my.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.ItemImgDao;
import com.my.shop.entity.ItemImg;

@Service
public class ItemImgService {

    @Autowired
    ItemImgDao itemImgDao;  

    // 상품 이미지 생성
    public void create(ItemImg itemImg) {
        itemImgDao.create(itemImg);
    }   

    // 상품 이미지 조회
    public List<ItemImg> findByItemIdx(int item_idx) {
        return itemImgDao.findByItemIdx(item_idx);
    }
}

