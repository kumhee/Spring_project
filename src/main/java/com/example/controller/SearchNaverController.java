package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.domain.QueryVO;
import com.example.domain.ShopSearch;

@Controller
@RequestMapping("/search")
public class SearchNaverController {
	
	@GetMapping("/list")
	public String list() {
		return "search.html";
	}
	
	@GetMapping("/list.json")
	@ResponseBody
	public String listJSON(QueryVO vo) {
		return ShopSearch.run(vo);
	}
}
