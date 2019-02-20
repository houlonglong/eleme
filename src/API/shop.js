import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

function getSeller (id) {
  return axios.get(`/seller?id=${id}`);
}

function getGoods () {
  return axios.get('/goods');
}

function getRatings () {
  return axios.get('/ratings');
}

export default {
  getSeller,
  getGoods,
  getRatings
};
