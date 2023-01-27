import { UserInterface } from '../interfaces/userInterface';

const axios = require('axios').default;

const url = 'https://iim-safer-2.herokuapp.com/api';

export const registerUser = async (data: UserInterface) => axios.post(`${url}/auth/register`, data);

export const loginUser = async (data: { email: string, password: string }) => axios.post(`${url}/auth/login`, data);

export const getUser = async (userId: string, token: string) => {
  const config = {
    method: 'get',
    url: `${url}/user/${userId}`,
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios(config);
};
