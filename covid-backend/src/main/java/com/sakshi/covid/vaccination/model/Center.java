package com.sakshi.covid.vaccination.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/** 
 * Represents the Vaccination Center
*/
public class Center {
	@JsonProperty("center_id")
	private String id;
	
	private String name;
	
	private String address;
	
	@JsonProperty("state_name")
	private String stateName;
	
	@JsonProperty("district_name")
	private String districtName;
	
	@JsonProperty("block_name")
	private String blockName;
	
	private String pincode;

	private String lat;
	
	@JsonProperty("long")
	private String longitude;
	
	private String from;
	
	private String to;
	
	@JsonProperty("fee_type")
	private String feeType;
	
	private List<Session> sessions;
	
	@JsonProperty("vaccine_fees")
	private List<Vaccine> vaccineFee;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public String getBlockName() {
		return blockName;
	}

	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getFeeType() {
		return feeType;
	}

	public void setFeeType(String feeType) {
		this.feeType = feeType;
	}

	public List<Session> getSessions() {
		return sessions;
	}

	public void setSessions(List<Session> sessions) {
		this.sessions = sessions;
	}

	public List<Vaccine> getVaccineFee() {
		return vaccineFee;
	}

	public void setVaccineFee(List<Vaccine> vaccineFee) {
		this.vaccineFee = vaccineFee;
	}
}
