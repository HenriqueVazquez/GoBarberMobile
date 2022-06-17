/* eslint-disable import/no-unresolved */
import {HostIP} from '@env';

import axios from 'axios';

const api = axios.create({
  baseURL: `http://${HostIP}:3333`,
});

export default api;
