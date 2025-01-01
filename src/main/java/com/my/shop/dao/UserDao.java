package com.my.shop.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.User;

import java.util.HashMap;
import java.util.Map;

@Repository
public class UserDao {
    
    @Autowired
    SqlSession sqlSession;

    ///////////////////////////// 로그인 필요한 메서드 /////////////////////////////////    

    // 로그인
    public User login(User user) {
        return sqlSession.selectOne("UserMapper.login", user);
    }

    ///////////////////////////// 회원 생성할때 필요한 메서드 /////////////////////////////////

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

    // 비밀번호 찾기
    public boolean findByPw(String pw) {
        return sqlSession.selectOne("UserMapper.findByPw", pw);
    }

    // 전화번호 찾기
    public User findByNumber(String number) {
        return sqlSession.selectOne("UserMapper.findByNumber", number);
    }

    ///////////////////////////// 아이디 & 비밀번호 찾기  /////////////////////////////////

    // 이름 & 이메일 & 전화번호로 아이디 찾기
    public User findIdByEPN(String name, String email, String number) {
        Map<String, String> params = new HashMap<>();
        params.put("name", name);
        params.put("email", email);
        params.put("number", number);
        return sqlSession.selectOne("UserMapper.findIdByEPN", params);
    }

    // 아이디 & 이름 & 전화번호로 아이디 찾기
    public User findIdByIN(String id, String name, String number) {
        Map<String, String> params = new HashMap<>();
        params.put("id", id);
        params.put("name", name);
        params.put("number", number);
        return sqlSession.selectOne("UserMapper.findIdByIN", params);
    }

    // 비밀번호 업데이트
    public void updatePw(User user) {
        sqlSession.update("UserMapper.updatePw", user);
    }

    // 기존 비밀번호 체크 
    public boolean checkOldPw(User user, String pw) {  
        Map<String, String> params = new HashMap<>();
        params.put("id", user.getId());
        params.put("pw", pw);
        return sqlSession.selectOne("UserMapper.checkOldPw", params);
    }

    ///////////////////////////// 마이페이지 수정 /////////////////////////////////

    // 유저 정보 업데이트
    public void update(User user) {
        sqlSession.update("UserMapper.update", user);
    }

    // 유저 새로운 이미지 업데이트
    public void updateImgUrl(String img_url) {
        sqlSession.update("UserMapper.updateImgUrl", img_url);
    }

    // 유저 전화번호 업데이트
    public void updateNumber(User user) {
        sqlSession.update("UserMapper.updateNumber", user);
    }

     // 유저 탈퇴
     public void delete(String user_code) {
        sqlSession.delete("UserMapper.delete", user_code);
    }




}
