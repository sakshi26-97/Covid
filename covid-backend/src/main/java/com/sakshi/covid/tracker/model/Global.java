package com.sakshi.covid.tracker.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/** 
 * Represents the Global
*/
public class Global {
	@JsonProperty("NewConfirmed")
	private String newConfirmed;
	
	@JsonProperty("TotalConfirmed")
	private String totalConfirmed;
	
	@JsonProperty("NewDeaths")
	private String newDeaths;
	
	@JsonProperty("TotalDeaths")
	private String totalDeaths;
	
	@JsonProperty("NewRecovered")
	private String newRecovered;
	
	@JsonProperty("TotalRecovered")
	private String totalRecovered;
	
	@JsonProperty("Date")
	private String date;

	public String getNewConfirmed() {
		return newConfirmed;
	}

	public void setNewConfirmed(String newConfirmed) {
		this.newConfirmed = newConfirmed;
	}

	public String getTotalConfirmed() {
		return totalConfirmed;
	}

	public void setTotalConfirmed(String totalConfirmed) {
		this.totalConfirmed = totalConfirmed;
	}

	public String getNewDeaths() {
		return newDeaths;
	}

	public void setNewDeaths(String newDeaths) {
		this.newDeaths = newDeaths;
	}

	public String getTotalDeaths() {
		return totalDeaths;
	}

	public void setTotalDeaths(String totalDeaths) {
		this.totalDeaths = totalDeaths;
	}

	public String getNewRecovered() {
		return newRecovered;
	}

	public void setNewRecovered(String newRecovered) {
		this.newRecovered = newRecovered;
	}

	public String getTotalRecovered() {
		return totalRecovered;
	}

	public void setTotalRecovered(String totalRecovered) {
		this.totalRecovered = totalRecovered;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
}
