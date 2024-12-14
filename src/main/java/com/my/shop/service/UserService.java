package com.my.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.UserDao;
import com.my.shop.entity.User;

@Service
public class UserService {

	@Autowired
	UserDao userDao;

	// 회원 생성
	public void create(User user) {
		userDao.create(user);
	}

	// 이메일 찾기
	public User findByEmail(String email) {
		return userDao.findByEmail(email);
	}

	// 아이디 찾기
	public User findById(String id) {
		return userDao.findById(id);
	}

	// 닉네임 찾기
	public User findByNick(String nick) {
		return userDao.findByNick(nick);
	}

	// 전화번호 찾기
	public User findByNumber(String number) {
		return userDao.findByNumber(number);
	}

	// 유저 아이디&비밀번호 찾기
	public User findByIdAndPw(User user) {
		return userDao.findByIdAndPw(user);
	}

	// 유저 정보 수정
	public void update(User user) {
		userDao.update(user);
	}

	// 유저 탈퇴
	public void delete(String user_code) {
		userDao.delete(user_code);
	}

	// 유저 img_url 업데이트
	public void createImgUrl(User user) {
		userDao.createImgUrl(user);
	}

}
