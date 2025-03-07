import { MOBILE_BREAK_POINT } from '@/constants/break-point';
import { EColors } from '@/themes';
import { FC } from 'react';
import { styled } from 'styled-components';

const HomeHeader: FC = () => {
  return (
    <StyledContainer>
      <StyledTitle>BROCCOLI & CO.</StyledTitle>
    </StyledContainer>
  );
};

export default HomeHeader;

const StyledContainer = styled.header`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 6rem;
  background-color: ${EColors.ACCENT};
  color: ${EColors.WHITE};

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
