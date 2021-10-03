package com.sakshi.covid.tracker.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sakshi.covid.tracker.model.Country;
import com.sakshi.covid.tracker.model.Province;
import com.sakshi.covid.tracker.model.Summary;

@RestController()
@RequestMapping("tracker")
public class Tracker {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${COVID_TRACKER_URL}")
	private String COVID_TRACKER_URL;

	/**
	 * List of countries
	 * @return Array of countries along with its id
	 */
	@GetMapping("country")
	public List<Country> getCountries() {
		ResponseEntity<Country[]> responseEntity = restTemplate.getForEntity(COVID_TRACKER_URL + "/countries", Country[].class);
		List<Country> country = Arrays.asList(responseEntity.getBody());
		return country;
	}
	
	/**
	 * COVID cases summary for given country
	 * 
	 * @param countryName name of the country
	 * @return COVID cases count for given country
	 */
	@GetMapping("country/{countryName}")
	public List<Province> getCountByCountry(@PathVariable String countryName) {
		ResponseEntity<Province[]> responseEntity = restTemplate.getForEntity(COVID_TRACKER_URL + "/total/country/" + countryName, Province[].class);
		List<Province> countByCountry = Arrays.asList(responseEntity.getBody());
		return countByCountry;
	}
	
	/**
	 * COVID cases summary for all the countries and the globe
	 * 
	 * @return COVID cases count for all the countries and the globe
	 */
	@GetMapping("summary")
	public Summary getSummary() {
		Summary summary = restTemplate.getForObject(COVID_TRACKER_URL + "/summary", Summary.class);
		return summary;
	}
}
