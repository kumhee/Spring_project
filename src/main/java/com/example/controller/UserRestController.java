package com.example.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.UserDAO;
import com.example.domain.UserVO;

@RestController
@RequestMapping("/user")
public class UserRestController {
	
	@Autowired
	UserDAO dao;
	
	@GetMapping("/read")
	public HashMap<String, Object> read(String uid) {
		return dao.read(uid);
	}
	
	@PostMapping("/login")
	public int login(@RequestBody UserVO vo) {
		int result = 0;
		
		HashMap<String, Object> user = dao.read(vo.getUid());
		if(user != null) {
			if(vo.getUpass().equals(user.get("upass"))) {
				result = 1;
			} else {
				result = 2;
			}
		}
		return result;
	}
	
	@PostMapping("/update")
	public void update(@RequestBody UserVO vo) {
		dao.update(vo);
	}

}
