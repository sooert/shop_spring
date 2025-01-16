package com.my.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.shop.dao.BodySpecsDao;
import com.my.shop.entity.BodySpecs;
import java.time.LocalDateTime;

@Service
public class BodySpecsService {

    @Autowired
    BodySpecsDao bodySpecsDao;

    ///////////////// 바디 치수 생성 /////////////////////

    // 바디 치수 생성
    public void bodySpecsCreate(BodySpecs bodySpecs) {
        bodySpecsDao.bodySpecsCreate(bodySpecs);
    }

    ///////////////// 바디 치수 조회 /////////////////////

    // 바디 치수 조회
    public BodySpecs bodySpecsSelect(String user_code) {
        return bodySpecsDao.bodySpecsSelect(user_code);
    }

    ///////////////// 바디 치수 수정 /////////////////////

    // 바디 치수 수정
    public void bodySpecsUpdate(BodySpecs bodySpecs) {
        bodySpecs.setUpdated_at(LocalDateTime.now());
        bodySpecsDao.bodySpecsUpdate(bodySpecs);
    }

}
