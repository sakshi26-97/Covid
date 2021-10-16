const Tracker = require('./clients/tracker');
const Vaccination = require('./clients/vaccination');
const config = require('./helpers/config');

function build () {
    const covid = {
        tracker: {
            async getCountries () {
                return await Tracker.tracker.getCountries();
            },

            async getCountByCountry (countryName) {
                return await Tracker.tracker.getCountByCountry(countryName);
            },

            async getSummary () {
                return await Tracker.tracker.getSummary();
            }
        },

        vaccination: {
            async getLiveCount () {
                return await Vaccination.vaccination.getLiveCount();
            },

            async getStates () {
                return await Vaccination.vaccination.getStates();
            },

            async getDistricts (stateId) {
                return await Vaccination.vaccination.getDistricts(stateId);
            },

            async searchByPin (pincode, date) {
                return await Vaccination.vaccination.searchByPin(pincode, date);
            },

            async searchByDistrict (districtId, date) {
                return await Vaccination.vaccination.searchByDistrict(districtId, date);
            },

            async getVaccinationReport () {
                return await Vaccination.vaccination.getVaccinationReport();
            }
        },
        config: {
            get backendAPI() {
                return config.backendAPI;
            },
            set backendAPI(value) {
                config.backendAPI = value;
            }
        }
    }

    covid.tracker = Object.freeze(covid.tracker);
    covid.vaccination = Object.freeze(covid.vaccination);

    return covid;
}

module.exports = build();