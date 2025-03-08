import Head from 'next/head';
import { FC } from 'react';
import styled from 'styled-components';
import HomeHeader from './header';
import HomeFooter from './footer';
import HomeBody from './body';
import { MIN_WIDTH } from '@/constants/break-point';

const Home: FC = () => {
  return (
    <StyledContainer>
      <Head>
        <title>Broccoli & Co.</title>
        <meta
          name="description"
          content="Broccoli & Co., an upcoming online service company!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeHeader />
      <HomeBody />
      <HomeFooter />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: red;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  min-width: ${MIN_WIDTH};
`;

export default Home;
