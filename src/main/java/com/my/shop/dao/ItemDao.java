package com.my.shop.dao;

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

    // 상품 목록
    public List<Item> findAll() {
        return sqlSession.selectList("ItemMapper.findAll");
    }

    // 상품 수정
    public void update(Item item) {
        sqlSession.update("ItemMapper.update", item);
    }

    // 상품 상세 조회
    public Item detailItem(String item_code) {
        return sqlSession.selectOne("ItemMapper.detail-item", item_code);
    }


}
