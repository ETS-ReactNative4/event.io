require('dotenv').config()
const axios = require('axios').default

module.exports = {
  geocodeReverse: function(location, callback) {
    axios
      .get(
        `http://www.mapquestapi.com/geocoding/v1/reverse?location=${location.latitude},${location.longitude}&key=${process.env.MAPQUEST_KEY}`
      )
      .then(response => {
        callback(response.data.results[0].locations[0])
      })
      .catch(err => {
        console.log(err)
      })
  }
}
