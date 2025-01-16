package com.my.shop.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.shop.entity.User;
import com.my.shop.service.UserService;
import com.my.shop.service.BodySpecsService;
import com.my.shop.entity.BodySpecs;

@RestController
@RequestMapping("api/user")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	BodySpecsService bodySpecsService;

	// 인증번호 발송
	@PostMapping("send")
	public String send(@RequestParam(value = "tel") String tel) {

		String numbercode = RandomStringUtils.randomAlphanumeric(6);

		// 요금 부과
//		DefaultMessageService messageService = NurigoApp.INSTANCE.initialize("NCSYFESEJW8O4DP3",
//				"JRVYVWQPHTNPADAWVUVI4LVAA0TBZNLX", "https://api.coolsms.co.kr");
//		// Message 패키지 중복될 경우 net.nurigo.sdk.message.model.Message로 치환하여 주세요
//
//		Message message = new Message();
//		message.setFrom("+01033935806");
//		message.setTo(tel);
//		message.setText("SMS는 한글 45자, 영자 90자까지 입력할 수 있습니다.");
//
//		try {
//			// send 메소드로 ArrayList<Message> 객체를 넣어도 동작합니다!
//			messageService.send(message);
//		} catch (NurigoMessageNotReceivedException exception) {
//			// 발송에 실패한 메시지 목록을 확인할 수 있습니다!
//			System.out.println(exception.getFailedMessageList());
//			System.out.println(exception.getMessage());
//		} catch (Exception exception) {
//			System.out.println(exception.getMessage());
//		}
		return numbercode;
	}

	///////////////////////////// 로그인 & 로그아웃 필요한 메서드 /////////////////////////////////

	// 로그인
	@PostMapping("login")
	public User login(@RequestParam(value = "id", required = true) String id,
					  @RequestParam(value = "pw", required = true) String pw, 
					  HttpSession session) {
	
		User user = new User();
		user.setId(id);
		user.setPw(pw);
	
		User result = userService.login(user);
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

	// 로그인 체크
	@GetMapping("loginCheck")
	public String loginCheck(HttpSession session) {
		if (session.getAttribute("me") != null) {
			return "success";
		}
		return "not-login";
	}
	
	///////////////////////////// 회원 생성할때 필요한 메서드 /////////////////////////////////

	// 회원 생성
	@PostMapping("create")
	public String create(@RequestParam(value = "id") String id, 
						 @RequestParam(value = "pw") String pw,
						 @RequestParam(value = "name") String name,
						 @RequestParam(value = "nick") String nick, 
						 @RequestParam(value = "address") String address,
						 @RequestParam(value = "detail_address") String detail_address,
						 @RequestParam(value = "number") String number, 
						 @RequestParam(value = "birth_date") String birth_date,
						 @RequestParam(value = "email") String email, 
						 @RequestParam(value = "img_url") String img_url) {

		try {
			String user_code = RandomStringUtils.randomAlphabetic(10);

			User user = new User();
			user.setId(id);
			user.setPw(pw);
			user.setName(name);
			user.setNick(nick);
			user.setAddress(address);
			user.setDetail_address(detail_address);
			user.setNumber(number);
			user.setBirth_date(birth_date);
			user.setEmail(email);
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
	@GetMapping("findById")
	public User findById(@RequestParam(value = "id") String id) {
		return userService.findById(id);
	}

	// 닉네임 찾기
	@GetMapping("findByNick")
	public User findByNick(@RequestParam(value = "nick") String nick) {
		return userService.findByNick(nick);
	}

	// 비밀번호 찾기
	@GetMapping("findByPw")
	public boolean findByPw(@RequestParam(value = "pw") String pw) {
		return userService.findByPw(pw);
	}

	// 전화번호 찾기
	@GetMapping("findByNumber")
	public User findByNumber(@RequestParam(value = "number") String number) {
		return userService.findByNumber(number);
	}

	///////////////////////////// 아이디 & 비밀번호 찾기 필요한 메서드 /////////////////////////////////

	// 이름 & 이메일 & 전화번호로 아이디 찾기
	@GetMapping("findIdByEPN")
	public User findIdByEPN(@RequestParam(value = "name") String name, 
						   @RequestParam(value = "email") String email, 
						   @RequestParam(value = "number") String number) {
		try {
			User user = userService.findIdByEPN(name, email, number);
			return user;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 아이디 & 이름 & 전화번호로 아이디 찾기
	@GetMapping("findIdByIN")
	public User findIdByIN(@RequestParam(value = "id") String id, 
							 @RequestParam(value = "name") String name, 
							 @RequestParam(value = "number") String number) {
		try {
			User user = userService.findIdByIN(id, name, number);
			return user;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 기존 비밀번호 체크
	@PostMapping("checkOldPw")
	public Map<String, Object> checkOldPw(@RequestParam(value = "id") String id, 
										  @RequestParam(value = "pw") String pw) {
		 Map<String, Object> response = new HashMap<>();
		 try {
			 User user = userService.findById(id);
			 if (user == null) {
				 response.put("success", false);
				 response.put("message", "사용자를 찾을 수 없습니다.");
				 return response;
			 }
			 
			 boolean isDuplicate = userService.checkOldPw(user, pw);
			 response.put("success", true);
			 response.put("isDuplicate", isDuplicate);
			 return response;
		 } catch (Exception e) {
			 e.printStackTrace();
			 response.put("success", false);
			 response.put("message", "비밀번호 확인 중 오류가 발생했습니다.");
			 return response;
		 }
	}

	// 비밀번호 업데이트
	@PostMapping("updatePw")
	public String updatePw(@RequestParam("id") String id, 
							   @RequestParam("newPw") String newPw) {
		try {
			User user = new User();
			user.setId(id);
			user.setPw(newPw);
			userService.updatePw(user);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}


	///////////////////////////// 마이페이지 필요한 메서드 /////////////////////////////////
	
	// 유저 정보 업데이트
	@PostMapping("update")
	public void update(
						@RequestParam(value = "pw") String pw, 
						@RequestParam(value = "nick") String nick, 
						@RequestParam(value = "birth_date") String birth_date, 
						@RequestParam(value = "email") String email, 
						@RequestParam(value = "address") String address, 
						@RequestParam(value = "detail_address") String detail_address, 
						HttpSession session) {
	
		User user = (User) session.getAttribute("me");
	
		user.setPw(pw);
		user.setNick(nick);
		user.setBirth_date(birth_date);
		user.setEmail(email);
		user.setAddress(address);
		user.setDetail_address(detail_address);
	
		userService.update(user);
	}

	// 유저 이미지 업데이트
	@PostMapping("updateImgUrl")
	public void updateImgUrl(@RequestParam(value = "img_url") String img_url, 
							 HttpSession session) {
		User user = (User) session.getAttribute("me");
		user.setImg_url(img_url);
		userService.updateImgUrl(img_url);
	}

	// 유저 전화번호 업데이트
	@PostMapping("updateNumber")
	public void updateNumber(@RequestParam(value = "number") String number, 
							 HttpSession session) {
		User user = (User) session.getAttribute("me");
		user.setNumber(number);
		userService.updateNumber(user);
	}

	// 유저 탈퇴
	@PostMapping("delete")
	public void delete(@RequestParam(value = "user_code") String user_code) {
		userService.delete(user_code);
	}

	///////////////////////////// 바디 치수  /////////////////////////////////

	// 바디 치수 생성
	@PostMapping("bodySpecsCreate")
	public void bodySpecsCreate(@RequestParam(value = "height") int height, 
								@RequestParam(value = "pants_size") int pants_size, 
								@RequestParam(value = "top_size") String top_size, 
								@RequestParam(value = "shoes_size") String shoes_size, 
								HttpSession session) {

		User user = (User) session.getAttribute("me");

		BodySpecs bodySpecs = new BodySpecs();
		bodySpecs.setHeight(height);
		bodySpecs.setPants_size(pants_size);
		bodySpecs.setTop_size(top_size);
		bodySpecs.setShoes_size(shoes_size);
		bodySpecs.setUser_code(user.getUser_code());
		bodySpecsService.bodySpecsCreate(bodySpecs);
	}

	// 바디 치수 수정	
	@PostMapping("bodySpecsUpdate")
	public void bodySpecsUpdate(@RequestParam(value = "height") int height, 
								@RequestParam(value = "pants_size") int pants_size, 
								@RequestParam(value = "top_size") String top_size, 
								@RequestParam(value = "shoes_size") String shoes_size, 
								HttpSession session) {
		User user = (User) session.getAttribute("me");
		BodySpecs bodySpecs = new BodySpecs();
		bodySpecs.setHeight(height);
		bodySpecs.setPants_size(pants_size);
		bodySpecs.setTop_size(top_size);
		bodySpecs.setShoes_size(shoes_size);
		bodySpecs.setUser_code(user.getUser_code());
		bodySpecsService.bodySpecsUpdate(bodySpecs);
	}


	// 바디 치수 조회
	@GetMapping("bodySpecsSelect")
	public BodySpecs bodySpecsSelect(HttpSession session) {
		User user = (User) session.getAttribute("me");
		return bodySpecsService.bodySpecsSelect(user.getUser_code());
	}
}
