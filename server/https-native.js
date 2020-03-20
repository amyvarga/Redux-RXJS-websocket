/* const https = require('https');
const url = 'https://api.tfl.gov.uk/line/295/arrivals';

const httpGet = () => {
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      const json = JSON.parse(body);
      //console.log('json', json);
      return json;
    });
  }).on("error", function(e){
    console.log("Got an error: ", e);
    return e;
  });
};

module.exports = httpGet; */

const fetch = require("node-fetch");

const getData = async url => {
  const response = await fetch(url);
  return await response.json();
};

module.exports = getData;
