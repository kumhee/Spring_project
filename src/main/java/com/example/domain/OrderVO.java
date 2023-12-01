package com.example.domain;

public class OrderVO {
	private String oid;
	private int pid;
	private int lprice;
	private int qnt;
	
	public String getOid() {
		return oid;
	}
	public void setOid(String oid) {
		this.oid = oid;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public int getLprice() {
		return lprice;
	}
	public void setLprice(int lprice) {
		this.lprice = lprice;
	}
	public int getQnt() {
		return qnt;
	}
	public void setQnt(int qnt) {
		this.qnt = qnt;
	}
	
	@Override
	public String toString() {
		return "OrderVO [oid=" + oid + ", pid=" + pid + ", lprice=" + lprice + ", qnt=" + qnt + "]";
	}
	
	
}
