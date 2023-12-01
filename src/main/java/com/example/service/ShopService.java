package com.example.service;

import java.util.*;

import com.example.domain.QueryVO;
import com.example.domain.ShopVO;

public interface ShopService {
	public void insert(ShopVO vo);
	public HashMap<String, Object> list(QueryVO vo);
	public HashMap<String, Object> read(int pid, String uid);
	public void insertFavorites(int pid, String uid);
	public void deleteFavorites(int pid, String uid);
}
