import Modal from '@/components/modal';
import { FC, useState } from 'react';
import { styled } from 'styled-components';
import InviteModalForm from './form';
import { EColors } from '@/themes';
import InviteModalSuccess from './success';

interface IInviteModal {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

enum EContent {
  FORM,
  SUCCESS,
}

const MODAL_TILE: Record<EContent, string> = {
  [EContent.FORM]: 'Request an invite',
  [EContent.SUCCESS]: 'All done!',
};

const InviteModal: FC<IInviteModal> = ({ isOpen, setIsModalOpen }) => {
  const [content, setContent] = useState<EContent>(EContent.FORM);

  const onSubmitSuccessHandler = () => setContent(EContent.SUCCESS);

  const onCloseHandler = () => {
    setIsModalOpen(false);
    setContent(EContent.FORM);
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler}>
      <StyledContainer>
        <StyledTitle>{MODAL_TILE[content]}</StyledTitle>
        <StyledDivider />
        {content === EContent.FORM ? (
          <InviteModalForm onSubmitSuccess={onSubmitSuccessHandler} />
        ) : (
          <InviteModalSuccess onOk={onCloseHandler} />
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
