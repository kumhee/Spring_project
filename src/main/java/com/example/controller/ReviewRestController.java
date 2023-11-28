package com.example.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.ReviewDAO;
import com.example.domain.ReviewVO;
import com.example.service.ReviewService;

@RestController
@RequestMapping("/review")
public class ReviewRestController {
	
	@Autowired
	ReviewDAO dao;
	
	@Autowired
	ReviewService service;
	
	@PostMapping("/insert")
	public void insert(@RequestBody ReviewVO vo) {
		service.insert(vo);
	}
	
	@GetMapping("/list.json")
	public HashMap<String, Object> list(int pid, int page, int size) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("total", dao.total(pid));
		map.put("list", dao.list(pid, page, size));
		return map;
	}
	
	@PostMapping("/delete/{cid}")
	public void delete(@PathVariable int cid) {
		service.delete(cid);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody ReviewVO vo) {
		dao.update(vo);
	}
}
