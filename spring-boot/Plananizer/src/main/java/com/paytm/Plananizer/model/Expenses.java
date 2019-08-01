package com.paytm.Plananizer.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Expenses {
	
	@Id
	private String id;
	
	private int amt;
	private int grocery;
	private int emi;
	private int shopping;
	private int personal;
	private int extraSavings;
	
	public int getGrocery() {
		return grocery;
	}
	public void setGrocery(int grocery) {
		this.grocery = grocery;
	}
	public int getEmi() {
		return emi;
	}
	public void setEmi(int emi) {
		this.emi = emi;
	}
	public int getShopping() {
		return shopping;
	}
	public void setShopping(int shopping) {
		this.shopping = shopping;
	}
	public int getPersonal() {
		return personal;
	}
	public void setPersonal(int personal) {
		this.personal = personal;
	}
	public int getExtraSavings() {
		return extraSavings;
	}
	public void setExtraSavings(int extraSavings) {
		this.extraSavings = extraSavings;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getAmt() {
		return amt;
	}
	public void setAmt(int amt) {
		this.amt = amt;
	}
	@Override
	public String toString() {
		return "Expenses [id=" + id + ", amt=" + amt + ", grocery=" + grocery + ", emi=" + emi + ", shopping="
				+ shopping + ", personal=" + personal + ", extraSavings=" + extraSavings + "]";
	}
	
}
