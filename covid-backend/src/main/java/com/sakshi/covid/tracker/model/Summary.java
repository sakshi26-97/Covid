package com.sakshi.covid.tracker.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/** 
 * Represents the Summary
*/
public class Summary {
	@JsonProperty("ID")
	private String id;
	
	@JsonProperty("Message")
	private String message;
	
	@JsonProperty("Date")
	private String date;
	
	@JsonProperty("Global")
	private Global global;
	
	@JsonProperty("Countries")
	private List<Country> countries;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Global getGlobal() {
		return global;
	}

	public void setGlobal(Global global) {
		this.global = global;
	}

	public List<Country> getCountries() {
		return countries;
	}

	public void setCountries(List<Country> countries) {
		this.countries = countries;
	}
	
}
