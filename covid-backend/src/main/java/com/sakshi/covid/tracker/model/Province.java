package com.sakshi.covid.tracker.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/** 
 * Represents the Province
*/
public class Province {
	@JsonProperty("Country")
	private String country;
	
	@JsonProperty("CountryCode")
	private String countryCode;
	
	@JsonProperty("Province")
	private String province;
	
	@JsonProperty("City")
	private String city;
	
	@JsonProperty("CityCode")
	private String cityCode;
	
	@JsonProperty("Lat")
	private String lat;
	
	@JsonProperty("Lon")
	private String lon;
	
	@JsonProperty("Confirmed")
	private String confirmed;
	
	@JsonProperty("Deaths")
	private String deaths;
	
	@JsonProperty("Recovered")
	private String recovered;
	
	@JsonProperty("Active")
	private String active;
	
	@JsonProperty("Date")
	private String date;
	
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	public String getCountryCode() {
		return countryCode;
	}
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	public String getCityCode() {
		return cityCode;
	}
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	
	public String getLon() {
		return lon;
	}
	public void setLon(String lon) {
		this.lon = lon;
	}
	
	public String getConfirmed() {
		return confirmed;
	}
	public void setConfirmed(String confirmed) {
		this.confirmed = confirmed;
	}
	
	public String getDeaths() {
		return deaths;
	}
	public void setDeaths(String deaths) {
		this.deaths = deaths;
	}
	
	public String getRecovered() {
		return recovered;
	}
	public void setRecovered(String recovered) {
		this.recovered = recovered;
	}
	
	public String getActive() {
		return active;
	}
	public void setActive(String active) {
		this.active = active;
	}
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
}
