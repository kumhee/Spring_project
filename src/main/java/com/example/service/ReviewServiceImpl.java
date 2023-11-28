package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.ReviewDAO;
import com.example.domain.ReviewVO;

@Service
public class ReviewServiceImpl implements ReviewService{

	@Autowired
	ReviewDAO dao;
	
	@Transactional
	@Override
	public void insert(ReviewVO vo) {
		dao.insert(vo);
		dao.updateReviewcnt(vo.getPid(), 1);
	}

	@Transactional
	@Override
	public void delete(int cid) {
		ReviewVO vo = dao.read(cid);
		dao.updateReviewcnt(vo.getPid(), -1);
		dao.delete(cid);
	}

}
