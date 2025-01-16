package com.my.shop.controller;

import com.my.shop.entity.Review;
import com.my.shop.entity.User;
import com.my.shop.entity.ReviewImg;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.shop.service.ReviewService;
import com.my.shop.service.ReviewImgService;
import com.my.shop.service.UserService;
import com.my.shop.service.ItemService;

@RestController
@RequestMapping("api/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @Autowired
    ReviewImgService reviewImgService;

    @Autowired
    UserService userService;

    @Autowired 
    ItemService itemService;

    ///////////////// 리뷰 생성 /////////////////////

   // 상품 생성
	@PostMapping("reviewAdd")
	public String reviewAdd(
                         @RequestParam(value = "title") String title,
                         @RequestParam(value = "content") String content,
                         @RequestParam(value = "star") int star,
                         @RequestParam(value = "item_code") String item_code,
                         @RequestParam(value = "item_category") String item_category,
                         @RequestParam(value = "item_price") int item_price,
                         @RequestParam(value = "review_img_url") String review_img_url,
                         @RequestParam(value = "detail_img_urls[]") List<String> detail_img_urls,
                         HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}

		try {
            // 닉네임 가져오기
			String nick = me.getNick();

			Review review = new Review();
			review.setUser_nick(nick);
			review.setTitle(title);
			review.setContent(content);
			review.setStar(star);
			review.setItem_code(item_code);
			review.setItem_category(item_category);
			review.setItem_price(item_price);
			review.setReview_img_url(review_img_url);

			// 아이템 생성 및 생성된 item_idx 반환받기
			reviewService.reviewAdd(review);
			int new_review_idx = review.getReview_idx();

			if (new_review_idx == 0) {
				throw new RuntimeException("review_idx가 생성되지 않았습니다.");
			}

			// 대표 이미지를 detail_img_urls 맨 앞에 추가
			detail_img_urls.add(0, review_img_url);

			// 상세 이미지 저장
			for (String url : detail_img_urls) {
				ReviewImg reviewImg = new ReviewImg();
				reviewImg.setReview_idx(new_review_idx);
				reviewImg.setReview_img_url(url);
				reviewImgService.reviewImgAdd(reviewImg);
			}

			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}

	}

    ///////////////// 리뷰 이미지 추가 /////////////////////

    // 리뷰 이미지 추가
    @PostMapping("imgs")
        public String imgs(@RequestParam(value = "detail_img_urls[]") List<String> detail_img_urls) {
            for (int i = 0; i < detail_img_urls.size(); i++) {
                String url = detail_img_urls.get(i);
                System.out.println(url);
            }
            return "ok";
        }




        
	}

