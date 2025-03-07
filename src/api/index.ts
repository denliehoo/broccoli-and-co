import { API_URLS } from '@/constants/api-urls';
import axios from 'axios';

export interface ISendInvitation {
  name: string;
  email: string;
}

export const apiSendInvitation = (params: ISendInvitation) =>
  axios.post(API_URLS.SEND_INVITE, params);
