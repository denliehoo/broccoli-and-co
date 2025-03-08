import { API_URLS } from '@/constants/api-urls';
import ApiRequest from '@/request';

export interface ISendInvitation {
  name: string;
  email: string;
}

export const apiSendInvitation = (
  params: ISendInvitation,
  signal?: AbortSignal,
) => ApiRequest.post(API_URLS.SEND_INVITE, params, signal);
