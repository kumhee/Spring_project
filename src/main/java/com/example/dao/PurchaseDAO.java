package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.OrderVO;
import com.example.domain.PurchaseVO;
import com.example.domain.QueryVO;
import com.example.domain.UserVO;

public interface PurchaseDAO {
	public void insertPurchase(PurchaseVO vo);
	public void insertOrder(OrderVO vo);
	public List<HashMap<String,Object>> listPurchase(UserVO vo);
	public int totalPurchase(String uid);
	public List<HashMap<String,Object>> listOrders(String oid);
	
	public List<HashMap<String,Object>> listAdmin(QueryVO vo);
	public int totalAdmin(QueryVO vo);
	public void updateStatus(PurchaseVO vo);
}