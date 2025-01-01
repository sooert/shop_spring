package com.my.shop.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.my.shop.entity.User;

@Controller
public class ViewController {

	//////////////////////////// 마이페이지 관리  ////////////////////////////////

	// 마이페이지 페이지 이동
	@GetMapping("basics")
	public String basics() {

		return "my-page/basics";
	}

	// 내정보 페이지 이동
	@GetMapping("my")
	public String my(HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "redirect:/login";
		}
		return "my-page/my";
	}

	// 전화번호 변경 페이지 이동
	@GetMapping("call")
	public String call(HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "redirect:/login";
		}
		return "my-page/call";
	}

	// 구매 내역 페이지 이동
	@GetMapping("buys")
	public String buys() {

		return "my-page/buys";
	}

	// 판매 내역 페이지 이동
	@GetMapping("sells")
	public String sells() {

		return "my-page/sells";
	}

	// 리뷰 페이지 이동
	@GetMapping("reviews")
	public String review() {

		return "my-page/reviews";
	}

	// 좋아요 페이지 이동
	@GetMapping("loves")
	public String love() {

		return "my-page/loves";
	}

	//////////////////////////// 메인 & 로그인 ////////////////////////////////

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

	//////////////////////////// 상품등록 ////////////////////////////////

	// 상품 등록 페이지
	@GetMapping("save-item")
	public String saveItem(HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "redirect:/login";
		}
		return "item/save-item";
	}

	// 상품 상세 페이지
	// 비회원도 상품 볼수있음 
	@GetMapping("detail-item")
	public String itemDetail() {
		return "item/detail-item";
	}

	//////////////////////////// 구매 & 장바구니 ////////////////////////////////

	// 구매 페이지
	// 비회원도 구매 가능 (단, 로그인 시도 요청)
	@GetMapping("buy")
	public String buy() {
		return "item/buy";
	}

	// 장바구니 페이지
	// 비회원도 장바구니 이동 가능
	@GetMapping("cart")
	public String cart() {
		return "item/cart";
	}

	//////////////////////////// 회원가입 ////////////////////////////////

	// 회원가입 페이지
	@GetMapping("join")
	public String join() {
		return "join/join";
	}

	// 전화번호 인증 페이지
	@GetMapping("phone")
	public String phone() {
		return "join/phone";
	}
	
	// 아이디 찾기 페이지
	@GetMapping("find-id")
	public String findId() {
		return "find/find-id";
	}

	// 비밀번호 찾기 페이지
	@GetMapping("find-pw")
	public String findPw() {
		return "find/find-pw";
	}

	// 비밀번호 변경 페이지
	@GetMapping("new-pw")
	public String newPw() {
		return "find/new-pw";
	}
}
