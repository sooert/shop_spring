package com.my.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.UserDao;
import com.my.shop.entity.User;

@Service
public class UserService {

	@Autowired
	UserDao userDao;

	///////////////////////////// 로그인 필요한 메서드 /////////////////////////////////

	// 로그인
	public User login(User user) {
		return userDao.login(user);
	}

	///////////////////////////// 회원 생성할때 필요한 메서드 /////////////////////////////////

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

	// 비밀번호 찾기
	public boolean findByPw(String pw) {
		return userDao.findByPw(pw);
	}


	///////////////////////////// 아이디 & 비밀번호 찾기 필요한 메서드 /////////////////////////////////


	// 이름 & 이메일 & 전화번호로 아이디 찾기
	public User findIdByEPN(String name, String email, String number) {
		return userDao.findIdByEPN(name, email, number);
	}

	// 아이디 & 이름 & 전화번호로 아이디 찾기
	public User findIdByIN(String id, String name, String number) {
		return userDao.findIdByIN(id, name, number);
	}

	// 비밀번호 업데이트 
	public void updatePw(User user) {
		userDao.updatePw(user);
	}

	// 기존 비밀번호 체크
	public boolean checkOldPw(User user, String pw) {
		return userDao.checkOldPw(user, pw);
	}

	///////////////////////////// 마이페이지 필요한 메서드 /////////////////////////////////

	// 유저 정보 업데이트
	public void update(User user) {
		userDao.update(user);
	}

	// 유저 이미지 업데이트
	public void updateImgUrl(String img_url) {
		userDao.updateImgUrl(img_url);
	}

	// 유저 전화번호 업데이트
	public void updateNumber(User user) {
		userDao.updateNumber(user);
	}

	// 유저 탈퇴
	public void delete(String user_code) {
		userDao.delete(user_code);
	}


}
