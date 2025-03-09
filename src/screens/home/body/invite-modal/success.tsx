import Button from '@/components/button';
import { useInviteModal } from '@/context/invite-modal';
import { FC } from 'react';
import { styled } from 'styled-components';

const InviteModalSuccess: FC = () => {
  const { closeModal } = useInviteModal();
  return (
    <StyledContainer>
      <StyledText>
        You will be one of the first to experience Broccoli & Co. when we
        launch.
      </StyledText>
      <Button onClick={closeModal} $isFullWidth>
        OK
      </Button>
    </StyledContainer>
  );
};

export default InviteModalSuccess;

const StyledContainer = styled.div``;

const StyledText = styled.div`
  text-align: center;
  padding: 6rem 2rem;
`;
