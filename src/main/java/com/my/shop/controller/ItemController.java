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
import com.my.shop.entity.ItemLike;
import com.my.shop.entity.User;
import com.my.shop.entity.Buy;
import com.my.shop.service.ItemImgService;
import com.my.shop.service.ItemService;
import com.my.shop.service.ItemLikeService;
import com.my.shop.service.UserService;
import com.my.shop.service.BuyService;

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

	///////////////////////////// 상품 등록 ///////////////////////////

	// 상품 생성
	@PostMapping("/api/item/create")
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

	// 상품 좋아요 조회
	@GetMapping("likes")
	public ItemLike likes(@RequestParam(value = "item_code") String item_code, 
							HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return null;
		}
		return itemLikeService.itemLikeRead(item_code);
	}

	// 상품 좋아요 감소
	@PostMapping("likeMinus")
	public String likeMinus(@RequestParam(value = "item_code") String item_code, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}
		try {
			// 좋아요 카운트 감소
			itemLikeService.itemLikeMinus(item_code, me.getNick());
			// 좋아요 기록 삭제
			itemLikeService.itemLikeDelete(item_code, me.getNick());
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
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

	///////////////////////////// 상품 구매 전체 조회 ///////////////////////////

	// 상품 구매 전체 조회
	@GetMapping("buyCount")
	public int buyCount(HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return 0;
		}
		return buyService.buyCount();
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



}