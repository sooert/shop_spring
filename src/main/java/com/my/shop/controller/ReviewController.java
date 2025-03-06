package com.my.shop.controller;

import com.my.shop.entity.Review;
import com.my.shop.entity.User;
import com.my.shop.entity.ReviewImg;
import com.my.shop.entity.ReviewLike;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.shop.service.ReviewService;
import com.my.shop.service.ReviewImgService;
import com.my.shop.service.UserService;
import com.my.shop.service.BuyService;
import com.my.shop.service.ItemService;
import com.my.shop.service.ReviewLikeService;

@RestController
@RequestMapping("api/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @Autowired
    ReviewImgService reviewImgService;

	@Autowired
	ReviewLikeService reviewLikeService;

    @Autowired
    UserService userService;

    @Autowired 
    BuyService buyService;

	@Autowired
	ItemService itemService;

    ///////////////// 리뷰 생성 /////////////////////

   // 상품 생성
	@PostMapping("reviewAdd")
	public String reviewAdd(
                         @RequestParam(value = "buy_code") String buy_code,
                         @RequestParam(value = "content") String content,
                         @RequestParam(value = "satisfaction") String satisfaction,
                         @RequestParam(value = "colors") String colors,
                         @RequestParam(value = "sizes") String sizes,
                         @RequestParam(value = "review_img_url") String review_img_url,
                         @RequestParam(value = "review_img_urls[]") List<String> review_img_urls,
                         HttpSession session) {
							
		String review_code =  RandomStringUtils.randomAlphanumeric(6);
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "not-login";
		}

		try {
            // 닉네임 가져오기
			String nick = me.getNick();
			
			// buy_code로 item_code 조회
			String item_code = buyService.getItemCodeByBuyCode(buy_code);
			if (item_code == null) {
				return "invalid-buy-code";
			}

			Review review = new Review();
			review.setReview_code(review_code);
			review.setBuy_code(buy_code);
			review.setItem_code(item_code);
			review.setUser_nick(nick);
			review.setSatisfaction(satisfaction);
			review.setColors(colors);
			review.setSizes(sizes);
			review.setContent(content);
			review.setReview_img_url(review_img_url);

			// 리뷰 생성 및 생성된 review_idx 반환받기
			reviewService.reviewAdd(review);
			int new_review_idx = review.getReview_idx();

			// review_idx가 생성되지 않은 경우 처리
			if (new_review_idx == 0) {
				throw new RuntimeException("review_idx가 생성되지 않았습니다.");
			}

			// 대표 이미지를 detail_img_urls 맨 앞에 추가
			review_img_urls.add(0, review_img_url);

			// 상세 이미지 저장
			for (String url : review_img_urls) {
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
        public String imgs(@RequestParam(value = "review_img_urls[]") List<String> review_img_urls) {
            for (int i = 0; i < review_img_urls.size(); i++) {
                String url = review_img_urls.get(i);
                System.out.println(url);
            }
            return "ok";
        }


	//////////////// 리뷰 조회 /////////////////////

	// 유저 닉네임으로 닉네임 조회
	@GetMapping("reviewList")
	public List<Review> reviewList(@RequestParam(value = "user_nick") String user_nick) {
		Review review = new Review();
		review.setUser_nick(user_nick);
		return reviewService.findByUserNick(review);
	}
        

	// 상품 코드로 리뷰 조회
	@GetMapping("reviewListByItemCode")
	public List<Review> reviewListByItemCode(@RequestParam(value = "item_code") String item_code) {
		Review review = new Review();
		review.setItem_code(item_code);
		return reviewService.findByItemCode(review);
	}

	//////////////// 좋아요 /////////////////////
	
	// 좋아요 생성
	@PostMapping("reviewLikeAdd")
	public String reviewLikeAdd(@RequestParam(value = "review_code") String review_code,
								@RequestParam(value = "review_like_count") int review_like_count) {
		ReviewLike reviewLike = new ReviewLike();
		reviewLike.setReview_code(review_code);
		reviewLike.setReview_like_count(review_like_count);
		reviewLikeService.reviewLikeAdd(reviewLike);
		return "ok";
	}
	
	// 좋아요 증가
	@PostMapping("reviewLikePlus")
	public String reviewLikePlus(@RequestParam(value = "review_code") String review_code) {
		reviewLikeService.reviewLikePlus(review_code);
		return "ok";
	}

	// 좋아요 취소
	@PostMapping("reviewLikeCancel")
	public String reviewLikeCancel(@RequestParam(value = "review_code") String review_code) {
		reviewLikeService.reviewLikeCancel(review_code);
		return "ok";
	}

}

