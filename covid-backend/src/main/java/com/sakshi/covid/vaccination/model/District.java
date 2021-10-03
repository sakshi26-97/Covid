package com.sakshi.covid.vaccination.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/** 
 * Represents the District
*/
public class District {
	@JsonProperty("district_id")
	private String id;
	
	@JsonProperty("district_name")
	private String name;

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
}
