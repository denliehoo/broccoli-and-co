import { createContext, FC, ReactNode, useState } from 'react';
import { IInviteModalContext } from './interface';
import { EInviteModalContent } from './enum';

export const InviteModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<EInviteModalContent>(
    EInviteModalContent.FORM,
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setContent(EInviteModalContent.FORM);
  };

  return (
    <InviteModalContext.Provider
      value={{ isOpen, openModal, closeModal, content, setContent }}
    >
      {children}
    </InviteModalContext.Provider>
  );
};

const initialContext: IInviteModalContext = {
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  content: EInviteModalContent.FORM,
  setContent: () => {},
};

export const InviteModalContext =
  createContext<IInviteModalContext>(initialContext);
