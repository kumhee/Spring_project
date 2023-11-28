package com.example.controller;

import java.io.File;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.ShopDAO;
import com.example.domain.QueryVO;
import com.example.domain.ShopVO;
import com.example.service.ShopService;

@RestController
@RequestMapping("/shop")
public class ShopRestController {
	
	@Autowired
	ShopDAO dao;
	
	@Autowired
	ShopService service;
	
	@PostMapping("/insert")
	public void insert(@RequestBody ShopVO vo) {
		service.insert(vo);
	}
	
	@GetMapping("/list.json")
	public HashMap<String, Object> list(QueryVO vo) {
		return service.list(vo);
	}
	
	@GetMapping("/delete")
	public void delete(int pid) {
		dao.delete(pid);
	}
	
	@GetMapping("/read/{pid}")
	public HashMap<String, Object> read(@PathVariable int pid) {
	    return dao.read(pid);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody ShopVO vo) {
		dao.update(vo);
	}
	
	@PostMapping("/image")
	public void image(ShopVO vo, MultipartHttpServletRequest multi) {
		MultipartFile file = multi.getFile("file");
		String path = "/upload/shop";
		String fileName = System.currentTimeMillis() + ".jpg";
		try {
			file.transferTo(new File("d:" + path + fileName));
			vo.setImage(path + fileName);
			dao.image(vo);
		} catch(Exception e) {
			System.out.println("이미지변경:" + e.toString());
		}
		
	}
	
	@GetMapping("/info/{pid}")
	public HashMap<String, Object> info(@PathVariable int pid, String uid) {
	    return service.read(pid, uid);
	}

	@GetMapping("/insert/favorite")
	public void insert(int pid, String uid) {
		service.insertFavorite(pid, uid);
	}
	
	@GetMapping("/delete/favorite")
	public void delete(int pid, String uid) {
		service.deleteFavorite(pid, uid);
	}
	
}
