const axios = require("axios").default;
import { UserInterface } from "../interfaces/User";

const url = "https://iim-safer-2.herokuapp.com/api";

export const register = async (data: UserInterface) => {
  return axios.post(`${url}/auth/register`, data);
};

export const login = async (email, password) => {
  return axios.post(`${url}/auth/login`, {
    email: email,
    password: password,
  });
};

export const getUser = async (userId, token) => {
  return axios.get(`${url}/user/${userId}`);
};
