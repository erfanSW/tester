import axios from 'axios';
import { Cookies } from 'quasar';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('access_token'),
    },
  });
};
