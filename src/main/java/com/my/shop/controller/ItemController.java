package com.my.shop.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.shop.entity.Item;
import com.my.shop.entity.ItemImg;
import com.my.shop.entity.User;
import com.my.shop.entity.Buy;
import com.my.shop.entity.Cart;
import com.my.shop.service.ItemImgService;
import com.my.shop.service.ItemService;
import com.my.shop.service.ItemLikeService;
import com.my.shop.service.UserService;
import com.my.shop.service.BuyService;
import com.my.shop.service.CartService;

@RestController
@RequestMapping("api/item")
public class ItemController {

	@Autowired
	UserService userService;

	@Autowired
	ItemService itemService;

	@Autowired
	ItemImgService itemImgService;
	
	@Autowired
	ItemLikeService itemLikeService;

	@Autowired
	BuyService buyService;

	@Autowired
	CartService cartService;

	///////////////////////////// 상품 등록 ///////////////////////////

	// 상품 생성
	@PostMapping("create")
	public String create(@RequestParam(value = "name") String name, 
                         @RequestParam(value = "category") String category,
                         @RequestParam(value = "content") String content,
                         @RequestParam(value = "item_img_url") String item_img_url,
                         @RequestParam(value = "company") String company,
                         @RequestParam(value = "detail_img_urls[]") List<String> detail_img_urls,
                         @RequestParam(value = "price") int price, 
                         @RequestParam(value = "discount") double discount,
                         HttpSession session) {

		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		
		try {
			int user_idx = me.getUser_idx();
			String itemCode = RandomStringUtils.randomAlphanumeric(10);
			double point = 0.01;

			Item item = new Item();
			item.setItem_code(itemCode);
			item.setUser_idx(user_idx);
			item.setName(name);
			item.setCategory(category);
			item.setContent(content);
			item.setItem_img_url(item_img_url);
			item.setCompany(company);
			item.setPrice(price);
			item.setDiscount(discount);
			item.setPoint(point);

			// 아이템 생성 및 생성된 item_idx 반환받기
			itemService.create(item);
			int new_item_idx = item.getItem_idx();

			if (new_item_idx == 0) {
				throw new RuntimeException("item_idx가 생성되지 않았습니다.");
			}

			// 대표 이미지를 detail_img_urls 맨 앞에 추가
			detail_img_urls.add(0, item_img_url);

			// 상세 이미지 저장
			for (String url : detail_img_urls) {
				ItemImg itemImg = new ItemImg();
				itemImg.setItem_idx(new_item_idx);
				itemImg.setItem_img_url(url);
				itemImgService.create(itemImg);
			}

			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

	// 상품 목록
	@GetMapping("findAll")
	public List<Item> findAll() {
		return itemService.findAll();
	}

	// 상품 이미지 생성
	@PostMapping("imgs")
	public String imgs(@RequestParam(value = "detail_img_urls[]") List<String> detail_img_urls) {
		for (int i = 0; i < detail_img_urls.size(); i++) {
			String url = detail_img_urls.get(i);
			System.out.println(url);
		}
		return "ok";
	}

	///////////////////////////// 상품 이미지 조회 ///////////////////////////
	
	// 상품 이미지 조회
	@GetMapping("imgs")
	public List<ItemImg> imgs(@RequestParam(value = "item_idx") int item_idx) {
		return itemImgService.findByItemIdx(item_idx);
	}

	// 상품 수정
	@PostMapping("update")
	public String update(@RequestParam(value = "name") String name, 
	                     @RequestParam(value = "content") String content,
	                     @RequestParam(value = "company") String company,
						 @RequestParam(value = "price") int price, 
						 @RequestParam(value = "discount") double discount,
						 @RequestParam(value = "detail_img_urls[]") List<String> detail_img_urls, 
						 HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		int user_idx = me.getUser_idx();
		String itemCode = RandomStringUtils.randomAlphanumeric(10);
		double point = 0.01;

		Item item = new Item();
		item.setItem_code(itemCode);
		item.setUser_idx(user_idx);
		item.setName(name);
		item.setContent(content);
		item.setPrice(price);
		item.setDiscount(discount);
		item.setPoint(point);

		itemService.update(item);

		return "ok";
	}

	///////////////////////////// 상품 상세 조회 ///////////////////////////

	// 상품 상세 조회
	@GetMapping("detail-item")
	public Item detailItem(@RequestParam(value = "item_code") String item_code) {
		Item item = itemService.detailItem(item_code);
		if (item == null) {
			throw new RuntimeException("상품을 찾을 수 없습니다.");
		}
		return item;
	}

	///////////////////////////// 상품 좋아요 ///////////////////////////

	// 상품 좋아요 생성
	@PostMapping("likeCreate")
	public String likeCreate(@RequestParam(value = "item_code") String item_code, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		itemLikeService.itemLikeCreate(item_code, me.getNick());
		return "ok";
	}

	// 상품 좋아요 증가
	@PostMapping("likePlus")
	public String likePlus(@RequestParam(value = "item_code") String item_code, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		itemLikeService.itemLikePlus(item_code, me.getNick());
		return "ok";
	}

	// 상품 좋아요 감소
	@PostMapping("likeMinus")
	public String likeMinus(@RequestParam(value = "item_code") String item_code, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		itemLikeService.itemLikeDelete(item_code, me.getNick());
		itemLikeService.itemLikeMinus(item_code, me.getNick());
		return "ok";
	}

	// 상품 좋아요 삭제
	@PostMapping("likeDelete")
	public String likeDelete(@RequestParam(value = "item_code") String item_code, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		itemLikeService.itemLikeMinus(item_code, me.getNick());
		itemLikeService.itemLikeDelete(item_code, me.getNick());
		return "ok";
	}

	// 좋아요 상태 확인
	@GetMapping("checkLikeStatus")
	public boolean checkLikeStatus(@RequestParam(value = "item_code") String item_code, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return false;
		}
		return itemLikeService.checkLikeStatus(item_code, me.getNick());
	}

	///////////////////////////// 상품 구매 생성 ///////////////////////////

	// 상품 구매 생성
	@PostMapping("buyAdd")
	public String buyAdd(
		@RequestParam(value = "item_code") String item_code,
		@RequestParam(value = "quantity") int quantity,
		@RequestParam(value = "color") String color,
		@RequestParam(value = "size") String size,
		@RequestParam(value = "buy_code") String buy_code,
		@RequestParam(value = "status") String status,
		HttpSession session) {
		
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		int user_idx = me.getUser_idx();
		
		try {
			Buy buy = new Buy();
			buy.setBuy_code(buy_code);
			buy.setItem_code(item_code);
			buy.setUser_idx(user_idx);
			buy.setQuantity(quantity);
			buy.setColor(color);
			buy.setSize(size);
			buy.setStatus(status);
			buyService.buyAdd(buy);
			return "ok";
		} catch(Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

	///////////////////////////// 구매 횟수 증가 ///////////////////////////	

	// 구매 횟수 증가
	@PostMapping("buyCountUpdate")
	public String buyCountUpdate(@RequestParam(value = "item_code") String item_code, 
								 @RequestParam(value = "quantity") int quantity,
								 HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		Map<String, Object> map = new HashMap<>();
		map.put("item_code", item_code);
		map.put("quantity", quantity);
		buyService.buyCountUpdate(map);
		return "ok";
	}

	///////////////////////////// 상품별 구매 횟수 조회 ///////////////////////////

	// 상품별 구매 횟수 조회
	@GetMapping("getBuyCount")
	public int getBuyCount(@RequestParam(value = "item_code") String item_code) {
		return buyService.getItemBuyCount(item_code);
	}

	///////////////////////////// 회원 구매 목록 상세 조회 ///////////////////////////	
	
	// 회원 구매 목록 상세 조회
	@GetMapping("buyListDetail")
	public List<Map<String, Object>> buyListDetail(HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return null;
		}
		return buyService.buyListDetail(me.getUser_idx());
	}

	// 사용자별 찜 목록 조회
	@GetMapping("findLikes")
	public List<Map<String, Object>> findLikes(HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return null;
		}
		return itemLikeService.findByUserNick(me.getNick());
	}

	// 주문 취소 처리
	@PostMapping("orderCancel")
	public Map<String, Object> orderCancel(@RequestParam(value = "buy_code") String buyCode, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		
		User me = (User) session.getAttribute("me");
		if (me == null) {
			response.put("status", "error");
			response.put("message", "로그인이 필요합니다.");
			return response;
		}
		
		try {
			// 취소할 주문 정보 조회
			Buy buy = buyService.findByBuyCode(buyCode);
			if (buy != null && buy.getUser_idx() == me.getUser_idx()) {
				// buy_count 감소를 위한 데이터 준비
				Map<String, Object> countMap = new HashMap<>();
				countMap.put("item_code", buy.getItem_code());
				countMap.put("quantity", -buy.getQuantity()); // 음수로 전달하여 감소
				
				// buy_count 감소
				buyService.buyCountUpdate(countMap);
				
				// 주문 상태를 취소로 변경
				buyService.orderCancel(buyCode);
				
				response.put("status", "success");
				response.put("message", "주문이 성공적으로 취소되었습니다.");
			} else {
				response.put("status", "error");
				response.put("message", "주문을 찾을 수 없거나 권한이 없습니다.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.put("status", "error");
			response.put("message", "주문 취소 중 오류가 발생했습니다.");
		}
		
		return response;
	}

	///////////////////////////// 주문 확정 ///////////////////////////

	// 주문 확정
	@PostMapping("orderConfirm")
	public String orderConfirm(@RequestParam(value = "buy_code") String buy_code, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		buyService.orderConfirm(buy_code);
		return "ok";
	}

	///////////////////////////// 주문 삭제 ///////////////////////////

	// 주문 삭제
	@PostMapping("orderDelete")
	public Map<String, Object> orderDelete(@RequestParam(value = "buy_code") String buy_code, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		
		User me = (User) session.getAttribute("me");
		if (me == null) {
			response.put("status", "error");
			response.put("message", "로그인이 필요합니다.");
			return response;
		}
		
		try {
			buyService.deleteBuy(buy_code);
			response.put("status", "success");
			response.put("message", "주문이 성공적으로 삭제되었습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			response.put("status", "error");
			response.put("message", "주문 삭제 중 오류가 발생했습니다.");
		}
		
		return response;
	}

	///////////////////////////// 장바구니 생성 ///////////////////////////

	// 장바구니 생성
	@PostMapping("cartCreate")
	public String cartCreate(
		@RequestParam(value = "item_code") String item_code,
		@RequestParam(value = "cart_count") int cart_count,
		@RequestParam(value = "item_name") String item_name,
		@RequestParam(value = "item_img_url") String item_img_url,
		@RequestParam(value = "item_color") String item_color,
		@RequestParam(value = "item_size") String item_size,
		@RequestParam(value = "total_price") int total_price,
		HttpSession session) {
		
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		
		try {
			String user_code = me.getUser_code();
			String cart_code = RandomStringUtils.randomAlphanumeric(10);
			
			Cart cart = new Cart();
			cart.setCart_code(cart_code);
			cart.setUser_code(user_code);
			cart.setItem_code(item_code);
			cart.setItem_name(item_name);
			cart.setItem_img_url(item_img_url);
			cart.setItem_color(item_color);
			cart.setItem_size(item_size);
			cart.setTotal_price(total_price);
			cart.setCart_count(cart_count);
			
			cartService.cartCreate(cart);
			return "ok";
		} catch(Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

	///////////////////////////// 장바구니 조회 ///////////////////////////

	// 장바구니 조회
	@GetMapping("cartList")
	public List<Cart> cartList(HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return null;
		}
		return cartService.cartList(me.getUser_code());
	}

	///////////////////////////// 장바구니 수량 증가 & 감소 ///////////////////////////

	// 장바구니 수량 증가
	@PostMapping("cartUpdatePlus")
	public String cartUpdatePlus(@RequestParam(value = "cart_idx") int cart_idx, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		Cart cart = new Cart();
		cart.setCart_idx(cart_idx);
		cartService.cartUpdatePlus(cart);
		return "ok";
	}

	// 장바구니 수량 감소
	@PostMapping("cartUpdateMinus")
	public String cartUpdateMinus(@RequestParam(value = "cart_idx") int cart_idx, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		Cart cart = new Cart();
		cart.setCart_idx(cart_idx);
		cartService.cartUpdateMinus(cart);
		return "ok";
	}

	// 장바구니 삭제
	@PostMapping("cartDelete")
	public String cartDelete(@RequestParam(value = "cart_idx") int cart_idx, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		Cart cart = new Cart();
		cart.setCart_idx(cart_idx);
		cartService.cartDelete(cart);
		return "ok";
	}

	///////////////////////////// 장바구니 구매 ///////////////////////////

	// 장바구니 구매
	@PostMapping("cartBuy")
	public String cartBuy(@RequestParam(value = "cart_idx") int cart_idx, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		Cart cart = new Cart();
		cart.setCart_idx(cart_idx);
		Buy buy = new Buy();
		buy.setBuy_code(cart.getCart_code());
		buy.setItem_code(cart.getItem_code());
		buy.setUser_idx(me.getUser_idx());
		buy.setQuantity(cart.getCart_count());
		buy.setColor(cart.getItem_color());
		buy.setSize(cart.getItem_size());
		buyService.buyAdd(buy);
		cartService.cartDelete(cart);
		return "ok";
	}

	///////////////////////////// 구매 상품 정보 로드 ///////////////////////////

	// 구매 상품 정보 로드
	@GetMapping("buyItemDetail")
	public Buy buyItemDetail(@RequestParam(value = "buy_code") String buy_code) {
		Buy buy = buyService.buyItemDetail(buy_code);
		if (buy == null) {
			throw new RuntimeException("상품을 찾을 수 없습니다.");
		}
		return buy;
	}

}

