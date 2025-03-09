import { MOBILE_BREAK_POINT } from '@/themes';
import { EColors } from '@/themes';
import { FC } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';

const HomeHeader: FC = () => {
  return (
    <StyledContainer>
      <Image
        src="/logo.png"
        alt="Next.js logo"
        width={32}
        height={32}
        priority
      />
      <StyledTitle>BROCCOLI & CO.</StyledTitle>
    </StyledContainer>
  );
};

export default HomeHeader;

const StyledContainer = styled.header`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 6rem;
  background-color: ${EColors.GREEN_500};
  color: ${EColors.WHITE};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    padding-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledTitle = styled.h1`
  font-size: 1rem;
`;
