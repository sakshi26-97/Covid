package com.sakshi.covid.vaccination.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Vaccination {
    @JsonProperty("total_doses")
    private long totalDoses;
    
    private long today;

    @JsonProperty("tot_dose_1")
    private long totalDose1;

    @JsonProperty("tot_dose_2")
    private long totalDose2;

	public long getTotalDoses() {
		return totalDoses;
	}

	public void setTotalDoses(long totalDoses) {
		this.totalDoses = totalDoses;
	}

	public long getToday() {
		return today;
	}

	public void setToday(long today) {
		this.today = today;
	}

	public long getTotalDose1() {
		return totalDose1;
	}

	public void setTotalDose1(long totalDose1) {
		this.totalDose1 = totalDose1;
	}

	public long getTotalDose2() {
		return totalDose2;
	}

	public void setTotalDose2(long totalDose2) {
		this.totalDose2 = totalDose2;
	}
}
