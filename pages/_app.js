import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            );
          },
          function (err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <link rel='manifest' href='manifest.json' />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
