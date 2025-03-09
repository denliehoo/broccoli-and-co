import { FC, useState } from 'react';
import { styled } from 'styled-components';
import InviteModal from './invite-modal';
import Button from '@/components/button';
import AnimatedText from '@/components/animated-text';
import { EColors } from '@/themes';

const HomeBody: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickHandler = () => setIsModalOpen(true);

  return (
    <StyledContainer>
      <StyledContent>
        <StyledTitle>
          <AnimatedText text="A better way" />
          <br />
          <AnimatedText text="to enjoy every day." />
        </StyledTitle>
        <StyledDescription>
          <AnimatedText
            text="Be the first to know when we launch."
            $fontSize={'1.3rem'}
            $fontWeight={400}
            $colorOnJump={EColors.GOLDEN}
          />
        </StyledDescription>
        <Button onClick={onClickHandler}>Request an invite</Button>
        <InviteModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </StyledContent>
    </StyledContainer>
  );
};

const StyledContainer = styled.main`
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

const StyledTitle = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledDescription = styled.div`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export default HomeBody;
