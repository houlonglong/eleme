import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

function getSeller() {
  return axios.get('/seller');
}

function getGoods() {
  return axios.get('/goods');
}

export default {
  getSeller,
  getGoods

}
 
  
