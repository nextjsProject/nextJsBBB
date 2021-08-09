import Head from 'next/head';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function Layout({ title, children }) {
  return (
    <div className="site-wrapper">
      {/* Head gibt den Titel im Reiter der WebSite aus */}
      <Head>
        <title>{title || 'NextJS'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header gibt den Titel auf der WebSite aus */}
      <Header title={title} />

      {/* children der Main sollen bevorzugt als inner-HTML ausgegeben werden */}
      {/* <Main children={children} /> */}
      <Main>{children}</Main>

      {/* Footer mit Copy-Right hat noch keine eigene .scss */}
      <Footer />
    </div>
  );
}
