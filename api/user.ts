const axios = require("axios").default;
import { UserInterface } from "../interfaces/userInterface";

const url = "https://iim-safer-2.herokuapp.com/api";

export const registerUser = async (data: UserInterface) => {
  return axios.post(`${url}/auth/register`, data);
};

export const loginUser = async (data) => {
  return axios.post(`${url}/auth/login`, data);
};

export const getUser = async (userId: string, token: string) => {
  let config = {
    method: "get",
    url: `${url}/user/${userId}`,
    headers: { Authorization: "Bearer " + token },
  };
  return axios(config);
};
