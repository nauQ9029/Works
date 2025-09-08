const axios = require("axios");
const https = require("https");

module.exports = axios.create({
  baseURL: "https://localhost:3443",
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});
