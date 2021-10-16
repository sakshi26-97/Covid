const axios = require("axios");
const generateError = require("../helpers/error");
const { backendAPI } = require("../helpers/config");

/**
 * Tracker Class
 */
class Tracker {
    constructor () {
        /**
         * Fetch all the countries
         * 
         * @returns Countries List
         */
        async function getCountries () {
            try {
                return (await axios.get(`${backendAPI}/tracker/country`)).data;
            } catch (error) {
                throw generateError(error);
            }
        }

        /**
         * COVID cases summary for given country
         * 
         * @param {string} countryName country name
         * @returns COVID cases count for given country
         */
        async function getCountByCountry (countryName) {
            try {
                return (await axios.get(`${backendAPI}/tracker/country/${countryName}`)).data;
            } catch (error) {
                throw generateError(error);
            }
        }

        /**
         * COVID cases summary for all the countries and the globe
         * 
         * @returns COVID cases count for all the countries and the globe
         */
        async function getSummary () {
            try {
                return (await axios.get(`${backendAPI}/tracker/summary`)).data;
            } catch (error) {
                throw generateError(error);
            }
        }

        Object.defineProperties(
            this,
            Object.freeze({
                tracker: {
                    value: Object.freeze({
                        getCountries,
                        getCountByCountry,
                        getSummary
                    }),
                    writable: false,
                },
            })
        );
    }
}

module.exports =  new Tracker();