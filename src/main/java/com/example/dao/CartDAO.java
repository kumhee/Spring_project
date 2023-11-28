package com.example.dao;

import java.util.*;

import com.example.domain.CartVO;
import com.example.domain.UserVO;

public interface CartDAO {
	public List<HashMap<String, Object>> list(UserVO vo);
	public int total (String uid);
	public void insert (CartVO vo);
	public void delete (int cid);
	public int check (CartVO vo);
	public void update (CartVO vo);
	public void updateQnt (CartVO vo);
	public String sum (String uid);
}
