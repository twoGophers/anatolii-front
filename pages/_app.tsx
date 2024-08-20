import type { AppProps } from 'next/app';
import Layout from '@/components/Layout/Layout';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global/Imports.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}