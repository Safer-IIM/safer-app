/* eslint-disable max-len */
import axios from "axios";
import { UserInterface } from "../interfaces/userInterface";

const url = "https://iim-safer-2.herokuapp.com/api";

//Need to be fixed
export const getContact = async (userId: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${url}/user/${userId}`, config);
  return response.data;
};

export const postContact = async (userId, emails: Array<String>) => {
  console.log(userId);
  const response = await axios.post(`${url}/user/subscription/${userId}`, {
    contacts: emails,
  });
  return response.data;
};
