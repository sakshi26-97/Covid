package com.sakshi.covid.vaccination.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/** 
 * Represents the Current Vaccine Status
*/
public class Session {
	@JsonProperty("session_id")
	private String id;
	
	private String date;
	
	@JsonProperty("available_capacity")
	private String availableCapacity;
	
	@JsonProperty("min_age_limit")
	private int minAgeLimit;
	
	@JsonProperty("allow_all_age")
	private boolean allowAllAge;
	
	private String vaccine;
	
	private List<String> slots;
	
	@JsonProperty("available_capacity_dose1")
	private String dose1;
	
	@JsonProperty("available_capacity_dose2")
	private String dose2;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getAvailableCapacity() {
		return availableCapacity;
	}

	public void setAvailableCapacity(String availableCapacity) {
		this.availableCapacity = availableCapacity;
	}

	public int getMinAgeLimit() {
		return minAgeLimit;
	}

	public void setMinAgeLimit(int minAgeLimit) {
		this.minAgeLimit = minAgeLimit;
	}

	public boolean isAllowAllAge() {
		return allowAllAge;
	}

	public void setAllowAllAge(boolean allowAllAge) {
		this.allowAllAge = allowAllAge;
	}

	public String getVaccine() {
		return vaccine;
	}

	public void setVaccine(String vaccine) {
		this.vaccine = vaccine;
	}

	public List<String> getSlots() {
		return slots;
	}

	public void setSlots(List<String> slots) {
		this.slots = slots;
	}

	public String getDose1() {
		return dose1;
	}

	public void setDose1(String dose1) {
		this.dose1 = dose1;
	}

	public String getDose2() {
		return dose2;
	}

	public void setDose2(String dose2) {
		this.dose2 = dose2;
	}
}
