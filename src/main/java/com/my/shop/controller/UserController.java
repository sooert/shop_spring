package com.my.shop.controller;

import javax.servlet.http.HttpSession;

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
	public String create(
		@RequestParam(value = "id") String id, 
		@RequestParam(value = "pw") String pw, 
		@RequestParam(value = "nick") String nick, 
		@RequestParam(value = "address") String address,
		@RequestParam(value = "detail_address") String detail_address,
		@RequestParam(value = "number") String number,
		@RequestParam(value = "birth_date") String birth_date,
		@RequestParam(value = "img_url") String img_url
		) {    
		
		try {
			String user_code = RandomStringUtils.randomAlphabetic(10);
			
			User user = new User();
			user.setId(id);
			user.setPw(pw);
			user.setNick(nick);
			user.setAddress(address);
			user.setDetail_address(detail_address);
			user.setNumber(number);
			user.setBirth_date(birth_date);
			user.setUser_code(user_code);
			user.setImg_url(img_url);

			userService.create(user);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

    // 아이디 찾기
    @PostMapping("findById")
    public User findById(@RequestParam(value = "id") String id) {
        return userService.findById(id);
    }

    // 닉네임 찾기
    @PostMapping("findByNick")
    public User findByNick(@RequestParam(value = "nick") String nick) {
        return userService.findByNick(nick);
    }

    // 전화번호 찾기
    @PostMapping("findByNumber")
    public User findByNumber(@RequestParam(value = "number") String number) {
        return userService.findByNumber(number);
    }

    // 로그인
	@PostMapping("login")
	public User login(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "pw", required = true) String pw, HttpSession session) {

		User user = new User();
		user.setId(id);
		user.setPw(pw);

		User result = userService.findByIdAndPw(user); 
		if (result != null) {
			session.setAttribute("me", result);
		}
		return result;
	}  

    // 로그아웃
    @PostMapping("logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    // 유저 아이디&비밀번호 찾기
    @PostMapping("findByIdAndPw")
    public User findByIdAndPw(@RequestParam(value = "id") String id, 
                              @RequestParam(value = "pw") String pw) {
        User user = new User();
        user.setId(id);
        user.setPw(pw);
        return userService.findByIdAndPw(user);
    }

    // 유저 정보 수정   
    @PostMapping("update")
    public void update(@RequestParam(value = "nick") String nick,
                       @RequestParam(value = "address") String address,
                       @RequestParam(value = "detail_address") String detail_address,
                       @RequestParam(value = "number") String number,
                       @RequestParam(value = "birth_date") String birth_date,
                       HttpSession session) {

        String user_code = (String) session.getAttribute("user_code");

        User user = new User(); 
        user.setUser_code(user_code);
        user.setNick(nick);
        user.setAddress(address);
        user.setDetail_address(detail_address);
        user.setNumber(number);
        user.setBirth_date(birth_date);

        userService.update(user);
    }

    // 유저 img_url 업데이트
    @PostMapping("createImgUrl")
    public void createImgUrl(@RequestParam(value = "img_url") String img_url,
                             @RequestParam(value = "id") String id) {
        User user = new User();
        user.setImg_url(img_url);
        user.setId(id);
        userService.createImgUrl(user);
    }

    // 유저 탈퇴
    @PostMapping("delete")
    public void delete(@RequestParam(value = "user_code") String user_code) {
        userService.delete(user_code);
    }

}
