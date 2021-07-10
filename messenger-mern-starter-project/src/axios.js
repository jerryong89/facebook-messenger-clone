const axios = require('axios').default

const instance = axios.create({
  //baseURL: 'http://localhost:9000'
  baseURL: 'https://messenger-chatroom-backend.herokuapp.com/'
})

export default instance
