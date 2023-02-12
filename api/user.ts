/* eslint-disable max-len */
import axios from 'axios';
import { UserInterface } from '../interfaces/userInterface';

const url = 'https://iim-safer-2.herokuapp.com/api';
// const url = 'http://localhost:4000/api';

export const registerUser = async (data: UserInterface) => axios.post(`${url}/auth/register`, data);

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string } | false> => {
  const response = await axios.post(
    `${url}/auth/login`,
    { email, password },
    {
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
  if (!response.data.token) {
    throw new Error('Invalid credentials');
  }

  return response.data.token;
};

export const getUser = async (userId: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${url}/user/${userId}`, config);
  return response.data;
};
