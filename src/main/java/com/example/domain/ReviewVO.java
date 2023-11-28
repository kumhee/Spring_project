package com.example.domain;

import java.util.Date;

public class ReviewVO {
	private int cid;
	private int pid;
	private String uid;
	private String body;
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
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	
	@Override
	public String toString() {
		return "ReviewVO [cid=" + cid + ", pid=" + pid + ", uid=" + uid + ", body=" + body + ", regdate=" + regdate
				+ "]";
	}
}
