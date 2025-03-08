import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { EColors } from '@/themes';
import Button from '@/components/button';

const NotFoundPage = () => {
  const router = useRouter();

  const handleRedirectHome = () => {
    router.push('/');
  };

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledHeader>404</StyledHeader>
        <StyledDescription>Page Not Found</StyledDescription>
        <Button onClick={handleRedirectHome}>Go to Home</Button>
      </StyledWrapper>
    </StyledContainer>
  );
};

export default NotFoundPage;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${EColors.BACKGROUND};
`;

const StyledWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: ${EColors.WHITE};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledHeader = styled.h1`
  font-size: 120px;
  color: ${EColors.ERROR};
  margin: 0;
`;

const StyledDescription = styled.p`
  font-size: 24px;
  color: ${EColors.BLACK};
  margin: 10px 0;
`;
