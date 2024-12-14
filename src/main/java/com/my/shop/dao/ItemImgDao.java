package com.my.shop.dao;   

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.ItemImg;

@Repository
public class ItemImgDao {
    @Autowired
    SqlSession sqlSession;

    // 상품 이미지 생성
    public void create(ItemImg itemImg) {
        sqlSession.insert("ItemImgMapper.create", itemImg);
    }   

    // 상품 이미지 조회
    public List<ItemImg> findByItemIdx(int item_idx) {
        return sqlSession.selectList("ItemImgMapper.findByItemIdx", item_idx);
    }
}
