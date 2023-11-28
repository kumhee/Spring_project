package com.example.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.CartDAO;
import com.example.domain.CartVO;
import com.example.domain.UserVO;
import com.example.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartRestController {
	
	@Autowired
	CartDAO dao;
	
	@Autowired
	CartService service;
	
	@GetMapping("/list.json") 
	public HashMap<String, Object> list(UserVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object> ();
		map.put("list", dao.list(vo));
		map.put("total", dao.total(vo.getUid()));
		map.put("sum", dao.sum(vo.getUid()));
		return map;
	}

	@PostMapping("/insert")
	public void insert(@RequestBody CartVO vo) {
		service.insert(vo);
	}
	
	@PostMapping("/delete/{cid}")
	public void delete(@PathVariable int cid ) {
		dao.delete(cid);
	}

	@PostMapping("/update/qnt")
	public void update(@RequestBody CartVO vo) {
		dao.updateQnt(vo);
	}
}
