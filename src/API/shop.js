import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

function getSeller() {
  return axios.get('/seller');
}

export default {
  getSeller
}
  
