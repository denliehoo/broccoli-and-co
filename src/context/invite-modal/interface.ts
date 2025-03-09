import { EInviteModalContent } from './enum';

export interface IInviteModalContext {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  content: EInviteModalContent;
  setContent: (content: EInviteModalContent) => void;
}
