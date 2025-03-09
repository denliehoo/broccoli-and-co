import { useContext } from 'react';
import { IInviteModalContext } from './interface';
import { InviteModalContext } from './context';

export const useInviteModal = (): IInviteModalContext => {
  return useContext(InviteModalContext);
};
