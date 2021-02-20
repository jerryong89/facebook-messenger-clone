const axios = require('axios').default

const instance = axios.create({
  baseURL: 'http://localhost:9000'
})

export default instance
