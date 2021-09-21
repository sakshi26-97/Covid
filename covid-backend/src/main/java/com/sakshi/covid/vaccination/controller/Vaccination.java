package com.sakshi.covid.vaccination.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sakshi.covid.vaccination.model.Centers;
import com.sakshi.covid.vaccination.model.Districts;
import com.sakshi.covid.vaccination.model.Live;
import com.sakshi.covid.vaccination.model.States;

@CrossOrigin
@RestController
@RequestMapping("vaccination")
public class Vaccination {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${COVID_VACCINATION_URL}")
	private String COVID_VACCINATION_URL;
	
	/**
	 * Live vaccination count
	 * @return live vaccination count
	 */
	@GetMapping("live/count")
	public Live getLiveVaccinationCount() {
		Live count = restTemplate.getForObject(COVID_VACCINATION_URL + "/v1/reports/getLiveVaccination", Live.class);
		return count;
	}
	
	/**
	 * State List
	 * 
	 * @return List of states
	 */
	@GetMapping("state")
	public States getStates() {
		States states = restTemplate.getForObject(COVID_VACCINATION_URL + "/v2/admin/location/states", States.class);
		return states;
	}
	
	/**
	 * District List for given state
	 * 
	 * @param stateId state ID
	 * @return List of ditricts for given state
	 */
	@GetMapping("district/{stateId}")
	public Districts getDistricts(@PathVariable String stateId) {
		System.out.println(COVID_VACCINATION_URL + "/v2/admin/location/districts/" + stateId);
		Districts districts = restTemplate.getForObject(COVID_VACCINATION_URL + "/v2/admin/location/districts/" + districtId, Districts.class);
		return districts;
	}
	
	/**
	 * Search vaccination centers by pincode
	 * 
	 * @param pincode Pincode
	 * @param date Date
	 * @return vaccination centers by pincode
	 */
	@GetMapping("search/pin")
	public Centers getVaccinesByPin(@RequestParam String pincode, @RequestParam String date) {
		String url = COVID_VACCINATION_URL + "/v2/appointment/sessions/public/calendarByPin?pincode=" + pincode + "&date=" + date;
		Centers centers = restTemplate.getForObject(url, Centers.class);
		return centers;
	}
	
	/**
	 * Search vaccination centers by ditrict
	 * 
	 * @param districtId District ID
	 * @param date Date
	 * @return vaccination centers by ditrict
	 */
	@GetMapping("search/district")
	public Centers getVaccinesByDistrict(@RequestParam String districtId, @RequestParam String date) {
		String url = COVID_VACCINATION_URL + "/v2/appointment/sessions/public/calendarByDistrict?district_id=" + districtId + "&date=" + date;
		Centers centers = restTemplate.getForObject(url, Centers.class);
		return centers;
	}
	
	/**
	 *  Search vaccination centers by center
	 *  
	 * @param centerId Center Id
	 * @param date Date
	 * @return vaccination centers by center
	 */
	@GetMapping("search/map")
	public Centers getVaccinesByMap(@RequestParam String centerId, @RequestParam String date) {
		String url = COVID_VACCINATION_URL + "/v2/appointment/sessions/public/calendarByCenter?center_id=" + centerId + "&date=" + date;
		Centers centers = restTemplate.getForObject(url, Centers.class);
		return centers;
	}
	
//	@GetMapping("report")
//	public Center getVaccineByCountry(@RequestParam String stateId, @RequestParam String districtId, @RequestParam String date) {
//		Center center = restTemplate.getForObject(COVID_VACCINATION_URL + "/v1/reports/v2/getPublicReports??state_id=" + stateId + "&district_id=" + districtId + "&date=" + date, Center.class);
//		return center;
//	}
}
