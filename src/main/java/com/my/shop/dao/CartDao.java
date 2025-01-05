package com.my.shop.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.Cart;

@Repository
public class CartDao {

    @Autowired
    SqlSession sqlSession;

    // 장바구니 생성
    public void cartCreate(Cart cart) {
        sqlSession.insert("CartMapper.cartCreate", cart);
    }

    // 장바구니 조회
    public List<Cart> cartList(String user_code) {
        return sqlSession.selectList("CartMapper.cartList", user_code);
    }

    // 장바구니 수량 증가
    public void cartUpdatePlus(Cart cart) {
        sqlSession.update("CartMapper.cartUpdatePlus", cart);
    }

    // 장바구니 수량 감소
    public void cartUpdateMinus(Cart cart) {
        sqlSession.update("CartMapper.cartUpdateMinus", cart);
    }

    // 장바구니 삭제
    public void cartDelete(Cart cart) {
        sqlSession.delete("CartMapper.cartDelete", cart);
    }
    

}
