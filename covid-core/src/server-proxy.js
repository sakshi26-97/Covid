const axios = require("axios");
const { backendAPI } = require("./config");

const generateError = require("./error");

(() => {
    class ServerProxy {
        constructor () {
            async function getCountries () {
                try {
                    return (await axios.get(`${backendAPI}/tracker/country`)).data;
                } catch (error) {
                    throw generateError(error);
                }
            }
    
            async function getCountByCountry (countryName) {
                try {
                    return (await axios.get(`${backendAPI}/tracker/country/${countryName}`)).data;
                } catch (error) {
                    throw generateError(error);
                }
            }
    
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
                    server: {
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

    const serverProxy = new ServerProxy();
    module.exports = serverProxy;

}) ();