// Quelle: https://newsapi.org/
// Add geojson: https://egghead.io/lessons/react-add-geojson-location-data-to-a-map-using-markers-and-popups-in-react-leaflet

import Layout from '@/components/Layout';
import BaederList from '@/components/BaederList';
// import BaederLocations from './library/berlinerBaeder.geojson';

// ################## aus standorte.jsx #########################
import dynamic from 'next/dynamic';
/* dynamisches Laden von: https://nextjs.org/docs/advanced-features/dynamic-import */
const LocationFinder = dynamic(() => import('@/components/LocationFinder'), {
  ssr: false,
});
// ############ Ende aus Standorte.jsx ###################

// const apiKey = process.env.NEWS_API_KEY;

export async function getStaticProps() {
  // code, der nur auf dem Server läuft und im Browser nicht zu sehen ist
  let baederWeb = [];

  // Auslesen von im Web bereit gestellten Daten des LaGeSo Berlin
  try {
    const response = await fetch(
      // beliebte News-API:
      // `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=de&category=technology&pageSize=10`// Bäder-API des LaGeSo Berlin:
      // urlWeb
      // { BaederLocations }
      `https://www.berlin.de/lageso/gesundheit/gesundheitsschutz/badegewaesser/liste-der-badestellen/index.php/index/all.gjson?q=`
    );

    const baederWebData = await response.json();

    baederWeb = baederWebData.features;

    //
  } catch (error) {
    console.log('Fehler beim Laden der Baederinfos');
  }

  return {
    props: {
      grusz: 'Bitte auch den Wetterbericht beachten: 😛',
      time: new Date().toLocaleTimeString(),
      baederWeb,
    },
    revalidate: 10,
  };
}

// Function musste 2x angelegt werden, da compilieren mit ungenutzen Var nicht mgl.
export default function baeder({ grusz, time, baederWeb }) {
  //
  return (
    <Layout title="Baden gehen... ">
      {grusz} - es ist {time}
      <br />
      <br />
      {/* {JSON.stringify(news)} */}
      {/* <NewsList news={news} title="aktuelle Meldungen" /> */}
      <LocationFinder />
      <BaederList
        baederWeb={baederWeb}
        title="Bäder in und um Berlin - Infos zu Standort und Qualität"
      />
      <br />
    </Layout>
  );
}
