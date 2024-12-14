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
    
    // 이메일 찾기
    public User findByEmail(String email) {
        return sqlSession.selectOne("UserMapper.findByEmail", email);
    }

    // 아이디 찾기
    public User findById(String id) {
        return sqlSession.selectOne("UserMapper.findById", id);
    }

    // 닉네임 찾기
    public User findByNick(String nick) {
        return sqlSession.selectOne("UserMapper.findByNick", nick);
    }

    // 전화번호 찾기
    public User findByNumber(String number) {
        return sqlSession.selectOne("UserMapper.findByNumber", number);
    }

    // 유저 정보 수정
    public void update(User user) {
        sqlSession.update("UserMapper.update", user);
    }

    // 유저 탈퇴
    public void delete(String user_code) {
        sqlSession.delete("UserMapper.delete", user_code);
    }

    // 유저 아이디&비밀번호 찾기
    public User findByIdAndPw(User user) {
        return sqlSession.selectOne("UserMapper.findByIdAndPw", user);
    }

    // 유저 img_url 업데이트
    public void createImgUrl(User user) {
        sqlSession.update("UserMapper.createImgUrl", user);
    }

}
