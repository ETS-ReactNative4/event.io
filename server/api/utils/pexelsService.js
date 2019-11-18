require('dotenv').config()
const axios = require('axios').default

module.exports = {
  async getPictures(num = 15) {
    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/curated?per_page=${num}&page=1`,
        {
          headers: {
            Authorization: process.env.PEXELS_KEY
          }
        }
      )
      return res.data.photos
    } catch (err) {
      console.log('PexelsService Error fetching photos', err)
    }
  }
}
