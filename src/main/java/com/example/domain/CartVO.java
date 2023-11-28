package com.example.domain;

import java.util.Date;

public class CartVO {
	private int cid;
	private int pid;
	private String uid;
	private int qnt;
	private Date regdate;
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public int getQnt() {
		return qnt;
	}
	public void setQnt(int qnt) {
		this.qnt = qnt;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	
	@Override
	public String toString() {
		return "CartVO [cid=" + cid + ", pid=" + pid + ", uid=" + uid + ", qnt=" + qnt + ", regdate=" + regdate + "]";
	}
	
	
}
