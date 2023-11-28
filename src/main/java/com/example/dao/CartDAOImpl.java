package com.example.dao;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.CartVO;
import com.example.domain.QueryVO;
import com.example.domain.UserVO;

@Repository
public class CartDAOImpl implements CartDAO{

	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.CartMapper";
	
	@Override
	public List<HashMap<String, Object>> list(UserVO vo) {
		vo.setStart((vo.getPage()-1) * vo.getSize());
		return session.selectList(namespace + ".list", vo);
	}
	
	@Override
	public int total(String uid) {
		return session.selectOne(namespace + ".total", uid);
	}

	@Override
	public void insert(CartVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void delete(int cid) {
		session.delete(namespace + ".delete", cid);
	}

	@Override
	public int check(CartVO vo) {
		return session.selectOne(namespace + ".check", vo);
	}

	@Override
	public void update(CartVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public void updateQnt(CartVO vo) {
		session.update(namespace + ".update_qnt", vo);
	}

	@Override
	public String sum(String uid) {
		return session.selectOne(namespace + ".sum", uid);
	}
	


}
