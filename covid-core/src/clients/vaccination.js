const axios = require("axios");
const generateError = require("../helpers/error");
const { backendAPI } = require("../helpers/config");

/**
 * Vaccination Class
 */
class Vaccination {
    constructor () {
        /**
         * Live vaccination count
         * 
	     * @returns live vaccination count
         */
        async function getLiveCount () {
            try {
                return (await axios.get(`${backendAPI}/vaccination/live/count`)).data;
            } catch (error) {
                throw generateError(error);
            }
        }

        /**
         * State List
         * 
         * @returns List of states
         */
        async function getStates () {
            try {
                return (await axios.get(`${backendAPI}/vaccination/state`)).data;
            } catch (error) {
                throw generateError(error);
            }
        }

        /**
         * District List for given state
         * 
         * @param {string} stateId state ID
         * @returns List of ditricts for given state
         */
        async function getDistricts (stateId) {
            try {
                return (await axios.get(`${backendAPI}/vaccination/district/${stateId}`)).data;
            } catch (error) {
                throw generateError(error);
            }
        }

        /**
         * Search vaccination centers by pincode
         * 
         * @param {string} pincode Pincode
         * @param {string} date Date
         * @returns vaccination centers by pincode
         */
        async function searchByPin (pincode, date) {
            try {
                return (await axios.get(`${backendAPI}/vaccination/search/pin?pincode=${pincode}&date=${date}`)).data;
            } catch (error) {
                throw generateError(error);
            }
        }

        /**
         * Search vaccination centers by ditrict
         * 
         * @param {string} districtId District ID
         * @param {string} date Date
         * @returns vaccination centers by ditrict
         */
        async function searchByDistrict (districtId, date) {
            try {
                return (await axios.get(`${backendAPI}/vaccination/search/district?districtId=${districtId}&date=${date}`)).data;
            } catch (error) {
                throw generateError(error);
            }
        }

        /**
         * Fetches summary of vaccination
         * 
         * @returns vaccination report
         */
        async function getVaccinationReport () {
            try {
                return (await axios.get(`${backendAPI}/vaccination/report`)).data;
            } catch (error) {
                throw generateError(error);
            }
        }

        Object.defineProperties(
            this,
            Object.freeze({
                vaccination: {
                    value: Object.freeze({
                        getLiveCount,
                        getStates,
                        getDistricts,
                        searchByPin,
                        searchByDistrict,
                        getVaccinationReport
                    }),
                    writable: false,
                },
            })
        );
    }
}

module.exports = new Vaccination();