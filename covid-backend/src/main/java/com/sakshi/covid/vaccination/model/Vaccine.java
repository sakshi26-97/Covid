package com.sakshi.covid.vaccination.model;

/** 
 * Represents the Type of Vaccine with fees
*/
public class Vaccine {
	private String vaccine;
	private String fee;
	
	public String getVaccine() {
		return vaccine;
	}
	public void setVaccine(String vaccine) {
		this.vaccine = vaccine;
	}
	public String getFee() {
		return fee;
	}
	public void setFee(String fee) {
		this.fee = fee;
	}
}
