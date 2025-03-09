import Button from '@/components/button';
import { FC } from 'react';
import { styled } from 'styled-components';

interface IInviteModalSuccess {
  onOk: () => void;
}

const InviteModalSuccess: FC<IInviteModalSuccess> = ({ onOk }) => {
  return (
    <StyledContainer>
      <StyledText>
        You will be one of the first to experience Broccoli & Co. when we
        launch.
      </StyledText>
      <Button onClick={onOk} $isFullWidth>
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
