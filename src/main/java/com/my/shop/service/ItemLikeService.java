package com.my.shop.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.ItemLikeDao;
import com.my.shop.entity.ItemLike;
    
@Service
public class ItemLikeService {

    @Autowired
    ItemLikeDao itemLikeDao;

    // 아이템 좋아요 생성
    public void itemLikeCreate(String item_code, String user_nick) {
        ItemLike itemLike = new ItemLike();
        itemLike.setItem_code(item_code);
        itemLike.setUser_nick(user_nick);
        itemLikeDao.itemLikeCreate(itemLike);
    }

    // 아이템 좋아요 조회
    public ItemLike itemLikeRead(String item_code) {
        return itemLikeDao.itemLikeRead(item_code);
    }

    // 아이템 좋아요 증가
    public void itemLikePlus(String item_code, String user_nick) {
        ItemLike itemLike = new ItemLike();
        itemLike.setItem_code(item_code);
        itemLike.setUser_nick(user_nick);
        itemLikeDao.itemLikePlus(itemLike);
    }

    // 아이템 좋아요 감소
    public void itemLikeMinus(String item_code, String user_nick) {
        ItemLike itemLike = new ItemLike();
        itemLike.setItem_code(item_code);
        itemLike.setUser_nick(user_nick);
        itemLikeDao.itemLikeMinus(itemLike);
    }

    // 아이템 좋아요 삭제
    public void itemLikeDelete(String item_code, String user_nick) {
        ItemLike itemLike = new ItemLike();
        itemLike.setItem_code(item_code);
        itemLike.setUser_nick(user_nick);
        itemLikeDao.itemLikeDelete(itemLike);
    }

    // 사용자별 찜 목록 조회
    public List<Map<String, Object>> findByUserNick(String user_nick) {
        return itemLikeDao.findByUserNick(user_nick);
    }

}
