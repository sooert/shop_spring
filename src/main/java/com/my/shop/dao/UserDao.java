package com.my.shop.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.User;

@Repository
public class UserDao {
    
    @Autowired
    SqlSession sqlSession;

    // 회원 생성
    public void create(User user) {
        sqlSession.insert("UserMapper.create", user);
    }   
}
