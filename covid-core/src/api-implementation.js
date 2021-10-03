
(() => {
    const serverProxy =  require("./server-proxy");  

    function implementAPI(covid) {
        covid.tracker.getCountries.implementation = async () => {
            const result = await serverProxy.tracker.getCountries();
            return result.data;
        }

        covid.tracker.getCountByCountry.implementation = async (countryName) => {
            const result = await serverProxy.getCountByCountry(countryName);
            return result.data;
        }

        covid.tracker.getSummary.implementation = async () => {
            const result = await serverProxy.getSummary();
            return result.data;
        }

        return covid;
    }

    module.exports = implementAPI;
}) ();