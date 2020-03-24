const fetch = require("node-fetch");
const getData = async url => {
  try {
    const response = await fetch(url);
    return await response.json();
  }
  catch(error ) {
    console.log(error);
  }
};

module.exports = getData;
