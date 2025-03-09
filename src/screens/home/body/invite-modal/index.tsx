import Modal from '@/components/modal';
import { FC } from 'react';
import { styled } from 'styled-components';
import InviteModalForm from './form';
import { EColors } from '@/themes';
import InviteModalSuccess from './success';
import {
  EInviteModalContent,
  INVITE_MODAL_TITLE,
  useInviteModal,
} from '@/context/invite-modal';

const InviteModal: FC = () => {
  const {
    content = EInviteModalContent.FORM,
    closeModal,
    isOpen,
  } = useInviteModal();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <StyledContainer>
        <StyledTitle>{INVITE_MODAL_TITLE[content]}</StyledTitle>
        <StyledDivider />
        {content === EInviteModalContent.FORM ? (
          <InviteModalForm />
        ) : (
          <InviteModalSuccess />
        )}
      </StyledContainer>
    </Modal>
  );
};

export default InviteModal;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const StyledDivider = styled.div`
  height: 2px;
  width: 80px;
  background-color: ${EColors.GREEN_500};
  margin-bottom: 1rem;
`;
