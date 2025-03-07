import { FC, useState } from 'react';
import { styled } from 'styled-components';
import InviteModal from './invite-modal';
import Button from '@/components/button';
import { EColors } from '@/themes';

const HomeBody: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickHandler = () => setIsModalOpen(true);

  return (
    <StyledContainer>
      <StyledContent>
        <StyledTitle>
          A better way <br /> to enjoy every day.
        </StyledTitle>
        <StyledDescription>
          Be the first to know when we launch.
        </StyledDescription>
        <Button onClick={onClickHandler}>Request an invite</Button>
        <InviteModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </StyledContent>
    </StyledContainer>
  );
};

export default HomeBody;

const StyledContainer = styled.main`
  background-color: ${EColors.BACKGROUND};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const StyledDescription = styled.div`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 2rem;
`;
