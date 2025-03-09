import Head from 'next/head';
import { FC } from 'react';
import styled from 'styled-components';
import HomeHeader from './header';
import HomeFooter from './footer';
import HomeBody from './body';
import { MIN_WIDTH } from '@/themes';
import { getImageProps } from 'next/image';
import { getBackgroundImage } from '@/utils/get-background-image';

const Home: FC = () => {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: '',
    width: 1024,
    height: 1024,
    src: '/background.webp',
    priority: true,
  });
  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <StyledContainer $imgSrc={backgroundImage}>
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

const StyledContainer = styled.div<{ $imgSrc?: string }>`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  min-width: ${MIN_WIDTH};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${({ $imgSrc }) => $imgSrc};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.2;
    z-index: -1;
  }
`;

export default Home;
