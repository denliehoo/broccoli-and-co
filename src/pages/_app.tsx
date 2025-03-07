import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: cursive, Comic Sans;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }

`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
