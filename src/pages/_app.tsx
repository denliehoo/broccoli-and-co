import type { AppProps } from 'next/app';
import '@/styles/global.css';
import AppProviders from '@/context/index.';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
}
