import type { AppProps } from 'next/app';
import Favicon from '../components/Favicon';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Favicon />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;