package com.example.domain;

import java.util.List;

public class PurchaseVO {
	private String oid;
	private String uid;
	private String uname;
	private String phone;
	private String address1;
	private String address2;
	private int sum;
	private int status;
	private List<OrderVO> orders;
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getOid() {
		return oid;
	}
	public void setOid(String oid) {
		this.oid = oid;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress1() {
		return address1;
	}
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	public String getAddress2() {
		return address2;
	}
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	public int getSum() {
		return sum;
	}
	public void setSum(int sum) {
		this.sum = sum;
	}
	
	public List<OrderVO> getOrders() {
		return orders;
	}
	
	public void setOrders(List<OrderVO> orders) {
		this.orders = orders;
	}
	
	@Override
	public String toString() {
		return "PurchaseVO [oid=" + oid + ", uid=" + uid + ", uname=" + uname + ", phone=" + phone + ", address1="
				+ address1 + ", address2=" + address2 + ", sum=" + sum + ", orders=" + orders + "]";
	}	
}