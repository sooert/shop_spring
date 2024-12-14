package com.my.shop.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.Item;

@Repository
public class ItemDao {

    @Autowired
    SqlSession sqlSession;

    // 상품 생성
    public void create(Item item) {
        sqlSession.insert("ItemMapper.create", item);
    }

    // 상품 조회
    public Item findByCode(String item_code) {
        return sqlSession.selectOne("ItemMapper.findByCode", item_code);
    }

    // 상품 총 개수
    public int totalCount() {
        return sqlSession.selectOne("ItemMapper.totalCount");
    }

    // 상품 목록
    public List<Item> findAll(HashMap<String, Object> params) {
        return sqlSession.selectList("ItemMapper.findAll", params);
    }

    // 상품 수정
    public void update(Item item) {
        sqlSession.update("ItemMapper.update", item);
    }
}
