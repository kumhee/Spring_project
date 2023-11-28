package com.example.domain;

import java.util.Date;

public class ShopVO {
	private int pid;
	private String productId;
	private String title;
	private String image;
	private int lprice;
	private String maker;
	private Date regdate;
	
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getLprice() {
		return lprice;
	}
	public void setLprice(int lprice) {
		this.lprice = lprice;
	}
	public String getMaker() {
		return maker;
	}
	public void setMaker(String maker) {
		this.maker = maker;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	
	@Override
	public String toString() {
		return "ShopVO [pid=" + pid + ", productId=" + productId + ", title=" + title + ", image=" + image + ", lprice="
				+ lprice + ", maker=" + maker + ", regdate=" + regdate + "]";
	}
	
}
