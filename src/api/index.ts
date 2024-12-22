import axios, { CreateAxiosDefaults } from 'axios';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
};

export const httpClient = axios.create(axiosConfig);
