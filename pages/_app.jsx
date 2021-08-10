// Globale Styles
import '../sass/style.scss';
import '@/library/naviscript';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
