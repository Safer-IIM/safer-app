/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import axios from 'axios';
import { URL_PROD } from '@env';
import { UserRecord } from '../interfaces/record.interfaces';

export const sendRecord = async (data: UserRecord) => {
  console.log('[sendRecord]: saving record');
  axios.post(`${URL_PROD}/record`, data);
};
