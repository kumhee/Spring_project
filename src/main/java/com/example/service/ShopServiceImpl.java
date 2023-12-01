package com.example.service;

import java.io.*;
import java.net.URL;
import java.util.HashMap;
import java.util.UUID; //아이디를 자동으로 겹치지않게 생성해주는 것.

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.ShopDAO;
import com.example.domain.QueryVO;
import com.example.domain.ShopVO;

@Service
public class ShopServiceImpl implements ShopService {

   @Autowired
   ShopDAO dao;
   
   @Transactional
   @Override
   public void insert(ShopVO vo) {
      int result=dao.check(vo.getProductId());
      if(result==0) {
         //이미지업로드
         UUID uuid=UUID.randomUUID();
         String image=uuid.toString().substring(0,8) + ".jpg"; //0에서 7번째까지
         try {
            URL url = new URL(vo.getImage());
            InputStream is = url.openStream();
            FileOutputStream fos = new FileOutputStream("D:/upload/shop/" + image);
            int data;
            while((data=is.read()) != -1) {
               fos.write(data);
            }
            fos.close();
            vo.setImage("/upload/shop/" + image);
            dao.insert(vo);
         }catch(Exception e) {
            System.out.println("이미지 업로드 오류 : " + e.toString());
         }
      }
   }

    @Transactional
    @Override
	public HashMap<String, Object> list(QueryVO vo) {
		HashMap<String, Object>  map = new HashMap<String, Object>();
		map.put("list", dao.list(vo));
		map.put("total", dao.total(vo));
		return map;
	}

    @Transactional
	@Override
	public HashMap<String, Object> read(int pid, String uid) {
		dao.viewcnt(pid);
		return dao.read(pid,uid);
	}

    @Transactional
	@Override
	public void insertFavorites(int pid, String uid) {
		dao.insertFavorites(pid, uid);
		dao.updateFavorites(pid, 1);
	}

    @Transactional
	@Override
	public void deleteFavorites(int pid, String uid) {
		dao.deleteFavorites(pid, uid);
		dao.updateFavorites(pid, -1);
	}
}




