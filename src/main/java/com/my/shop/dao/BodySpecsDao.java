package com.my.shop.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.shop.entity.BodySpecs;

@Repository
public class BodySpecsDao {
    
    @Autowired 
    SqlSession sqlSession;

    ///////////////// 바디 치수 생성 /////////////////////

    // 바디 치수 생성
    public void bodySpecsCreate(BodySpecs bodySpecs) {
        sqlSession.insert("BodySpecsMapper.bodySpecsCreate", bodySpecs);
    }


    ///////////////// 바디 치수 조회 /////////////////////

    // 바디 치수 조회
    public BodySpecs bodySpecsSelect(String user_code) {
        return sqlSession.selectOne("BodySpecsMapper.bodySpecsSelect", user_code);
    }

    ///////////////// 바디 치수 수정 /////////////////////

    // 바디 치수 수정
    public void bodySpecsUpdate(BodySpecs bodySpecs) {
        sqlSession.update("BodySpecsMapper.bodySpecsUpdate", bodySpecs); 
    }

}
