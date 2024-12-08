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
}
