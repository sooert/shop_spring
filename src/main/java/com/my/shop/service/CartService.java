package com.my.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.CartDao;
import com.my.shop.entity.Cart;

@Service
public class CartService {

    @Autowired
    CartDao cartDao;

    // 장바구니 생성
    public void cartCreate(Cart cart) {
        cartDao.cartCreate(cart);
    }

    // 장바구니 조회
    public List<Cart> cartList(String user_code) {
        return cartDao.cartList(user_code);
    }

    // 장바구니 수량 증가
    public void cartUpdatePlus(Cart cart) {
        cartDao.cartUpdatePlus(cart);
    }

    // 장바구니 수량 감소
    public void cartUpdateMinus(Cart cart) {
        cartDao.cartUpdateMinus(cart);
    }

    // 장바구니 삭제
    public void cartDelete(Cart cart) {
        cartDao.cartDelete(cart);
    }
    

}
