package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.OrderVO;
import com.example.domain.PurchaseVO;
import com.example.domain.QueryVO;
import com.example.domain.UserVO;

@Repository
public class PurchaseDAOImpl implements PurchaseDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.PurchaseMapper";
	
	@Override
	public void insertPurchase(PurchaseVO vo) {
		session.insert(namespace + ".insert_purchase", vo);
	}

	@Override
	public void insertOrder(OrderVO vo) {
		session.insert(namespace + ".insert_order", vo);
	}

	@Override
	public List<HashMap<String, Object>> listPurchase(UserVO vo) {
		vo.setStart((vo.getPage()-1) * vo.getSize());
		return session.selectList(namespace + ".list_purchase", vo);
	}

	@Override
	public int totalPurchase(String uid) {
		return session.selectOne(namespace + ".total_purchase", uid);
	}

	@Override
	public List<HashMap<String, Object>> listOrders(String oid) {
		return session.selectList(namespace + ".list_orders", oid);
	}

	@Override
	public List<HashMap<String, Object>> listAdmin(QueryVO vo) {
		vo.setStart((vo.getPage()-1) * vo.getSize());
		return session.selectList(namespace + ".list_admin", vo);
	}

	@Override
	public int totalAdmin(QueryVO vo) {
		return session.selectOne(namespace + ".total_admin", vo);
	}

	@Override
	public void updateStatus(PurchaseVO vo) {
		session.update(namespace + ".update_status", vo);
	}
}