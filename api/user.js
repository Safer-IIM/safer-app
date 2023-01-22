const axios = require("axios").default;

const url = "https://iim-safer-2.herokuapp.com/api";

export const register = async (name, email, password) => {
  return axios.post(`${url}/auth/register`, {
    name: name,
    email: email,
    password: password,
  });
};

export const login = async (email, password) => {
  return axios.post(`${url}/auth/login`, {
    email: email,
    password: password,
  });
};

export const getUser = async (userId, token) => {
  return axios.get(`${url}/user/${userId}`, {
    name: name,
    email: email,
    password: password,
  });
};
