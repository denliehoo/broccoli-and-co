import { EColors } from '@/themes';
import { FC } from 'react';
import { styled } from 'styled-components';

const HomeFooter: FC = () => {
  return (
    <StyledContainer>
      <StyledText>Made with ♥ in Melbourne.</StyledText>
      <StyledText>© 2016 Broccoli & Co. All rights reserved.</StyledText>
    </StyledContainer>
  );
};

export default HomeFooter;

const StyledContainer = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: ${EColors.FOOTER};
  color: ${EColors.WHITE};
`;

const StyledText = styled.div`
  text-align: center;
  font-size: 0.8rem;
`;
