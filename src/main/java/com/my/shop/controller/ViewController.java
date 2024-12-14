package com.my.shop.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.my.shop.entity.User;
import com.my.shop.service.UserService;

@Controller
public class ViewController {

	@Autowired
	UserService userService;

	// 로그인 여부 확인 후 페이지 이동
	private String getViewName(HttpSession session, String viewName) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "redirect:/login";
		}
		return viewName;
	}

	// 마이페이지 페이지 이동
	// @GetMapping("my-page")
	// public String mypage(HttpSession session, Model model) {
	// 	User me = (User) session.getAttribute("me");
	// 	if (me == null) {
	// 		return "redirect:/login";
	// 	}

	// 	User u = userService.findById(me.getId());
	// 	model.addAttribute("user", u);
	// 	return getViewName(session, "my-page");
	// }

	// 마이페이지 페이지 이동
	@GetMapping("my-page")
	public String mypage() {

		return "my-page";
	}

	// 메인 페이지
	@GetMapping("index")
	public String index() {
		return "index";
	}

	// 로그인 페이지
	@GetMapping("login")
	public String login() {
		return "login";
	}

	// 상품 등록 페이지
	@GetMapping("item/save-item")
	public String saveItem() {
		return "item/save-item";
	}

	// 상품 상세 페이지
	@GetMapping("item/detail-item")
	public String itemDetail() {
		return "item/detail-item";
	}

	// 구매 페이지
	@GetMapping("buy")
	public String buy() {
		return "buy";
	}

	// 장바구니 페이지
	@GetMapping("cart")
	public String cart() {
		return "cart";
	}

	///////// 회원가입 //////////

	// 회원가입 페이지
	@GetMapping("join")
	public String join() {
		return "join";
	}

	// 전화번호 인증 페이지
	@GetMapping("phone")
	public String phone() {
		return "phone";
	}

	

	

}
