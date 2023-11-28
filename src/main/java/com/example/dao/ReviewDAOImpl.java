package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.ReviewVO;

@Repository
public class ReviewDAOImpl implements ReviewDAO{

	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.ReviewMapper";
	
	@Override
	public void insert(ReviewVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<HashMap<String, Object>> list(int pid, int page, int size) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("pid", pid);
		map.put("start", (page-1)*size);
		map.put("size", size);
		return session.selectList(namespace + ".list", map);
	}

	@Override
	public int total(int pid) {
		return session.selectOne(namespace + ".total", pid);
	}

	@Override
	public void delete(int cid) {
		session.delete(namespace + ".delete", cid);
	}

	@Override
	public void updateReviewcnt(int pid, int amount) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("pid", pid);
		map.put("amount", amount);
		session.update(namespace + ".update_reviewcnt", map);
	}

	@Override
	public ReviewVO read(int cid) {
		return session.selectOne(namespace + ".read", cid);
	}

	@Override
	public void update(ReviewVO vo) {
		session.update(namespace + ".update", vo);
	}
}
