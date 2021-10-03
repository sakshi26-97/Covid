package com.sakshi.covid.vaccination.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/** 
 * Represents the State
*/
public class State {
	@JsonProperty("state_id")
	private String id;
	
	@JsonProperty("state_name")
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
