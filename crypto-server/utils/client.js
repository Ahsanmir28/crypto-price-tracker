const axios = require('axios')
const constants = require('./constants')

const apiClient = axios.create({
  baseURL: `${constants.COIN_GECKO_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
    "x-request-from": "internal",
    "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY
  },
});

module.exports = apiClient