package com.my.shop.controller;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.shop.entity.User;
import com.my.shop.service.UserService; 

@RestController
@RequestMapping("api/user")
public class UserController {

	@Autowired
	UserService userService;

	// 회원 생성
	@PostMapping("create")
	public void create(@RequestParam(value = "id") String id, 
                        @RequestParam(value = "pw") String pw, 
                        @RequestParam(value = "nick") String nick, 
                        @RequestParam(value = "email") String email,
                        @RequestParam(value = "address") String address,
                        @RequestParam(value = "number") String number,
                        @RequestParam(value = "img_url") String img_url,
                        @RequestParam(value = "birth_date") String birth_date) {    
        
        String user_code = RandomStringUtils.randomAlphabetic(10);
        
        User user = new User();
        user.setId(id);
        user.setPw(pw);
        user.setNick(nick);
        user.setEmail(email);
        user.setAddress(address);
        user.setNumber(number);
        user.setImg_url(img_url);
        user.setBirth_date(birth_date);
        user.setUser_code(user_code);
        
		userService.create(user);
	}

}
