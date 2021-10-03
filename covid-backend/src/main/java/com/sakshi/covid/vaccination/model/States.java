package com.sakshi.covid.vaccination.model;

import java.util.List;

/** 
 * Represents the List of States
*/
public class States {
	private List<State> states; 
	private int ttl;
	
	public List<State> getStates() {
		return states;
	}
	public void setStates(List<State> states) {
		this.states = states;
	}
	
	public int getTtl() {
		return ttl;
	}
	public void setTtl(int ttl) {
		this.ttl = ttl;
	}
}
