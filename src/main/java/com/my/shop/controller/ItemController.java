package com.my.shop.controller;

import java.util.List;

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
import com.my.shop.service.ItemImgService;
import com.my.shop.service.ItemService;

@RestController
@RequestMapping("api/item")
public class ItemController {

	@Autowired
	ItemService itemService;

	@Autowired
	ItemImgService itemImgService;

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
}