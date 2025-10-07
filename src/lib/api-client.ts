import axios from 'axios';

import { Config } from '@/config';
import { ONE_SECOND } from '@/constants/time';

import type { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: Config.API_URL,
  timeout: ONE_SECOND * 10,
  headers: {
    'Content-Type': 'application/json',
  },
});
