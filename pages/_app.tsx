import type { AppProps } from 'next/app';
import Layout from '@/components/Layout/Layout';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global/Imports.scss';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
        </Head>
          <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}