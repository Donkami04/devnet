const axios = require("axios");

const getApiData = async (apiUrl) => {
  try {
    const BASE_API_URL = "http://10.224.116.14:3001/api/v1/candelaria";
    const { data } = await axios.get(`${BASE_API_URL}/${apiUrl}`);
    return data
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw new Error("Failed to fetch data from API");
  }
};

module.exports = {
  getApiData,
};