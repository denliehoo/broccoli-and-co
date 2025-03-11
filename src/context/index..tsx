import { FC, ReactNode } from 'react';
import { InviteModalProvider } from './invite-modal';

const AppProviders: FC<{ children: ReactNode }> = ({ children }) => {
  // Use a higher-order component (HOC) to wrap multiple providers together when necessary
  return <InviteModalProvider>{children}</InviteModalProvider>;
};

export default AppProviders;
