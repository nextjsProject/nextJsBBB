import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import Filter from '@/components/FilterZipCode';

// ################## Karte mit Markierung aus PLZFinder.jsx ####################
import dynamic from 'next/dynamic';
/* dynamisches Laden von: https://nextjs.org/docs/advanced-features/dynamic-import */
const PLZFinder = dynamic(() => import('@/components/PLZFinder'), {
  ssr: false,
});

const zipcode = null;

// ############## Ergebnis-Export -> Anzeige der Berliner Bezirke im Browser
function Map() {
  // Ende Test
  return (
    <Layout title="PLZ-Suche mit Markierung des Ortes in der Karte">
      <div className="intro">
        <p className="bbezirke-svg">
          Berlin ist groß - und Postleitzahl ist nicht gleich Bezirk. Wir
          möchten Ihnen die Suche mit diesem Angebot etwas erleichtern.
          <br /> <br /> Sie haben 2 Möglichkeiten, es zu nutzen.
          <br /> 1. Sie wählen ein PLZ-Gebiet in der grünen Karte und erhalten
          PLZ sowie eine Detail-Ansicht in der Stra&szlig;enkarte.
          <br /> 2. Sie geben direkt eine PLZ in des Eingabefeld ein und
          erhalten sofort die Detail-Ansicht in der Straßenkarte.
        </p>

        <section id="plz-map">
          <Filter />
        </section>
      </div>
    </Layout>
  );
}

/* 
damit alles in der gewünschten Reihenfolge abläuft, 
muss die asynchrone fetch-function innerhab einer Kapsel-Fkt. aufgerufen werden
*/
function useLocationSearch(debouncedSearch, setLocations) {
  useEffect(() => {
    // damit die Ortssuche nicht beim ersten Buchstaben losläuft...
    if (debouncedSearch.length < 2) {
      // zurücksetzen der Suche für neue Suche
      setLocations([]);
      return;
    }
    // gekapselte fetch function
    async function fetchLocations() {
      try {
        const response = await fetch(
          `http://localhost:8000/?search=${debouncedSearch}`
        );
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Daten');
        }
        const jsonData = await response.json();
        setLocations(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLocations();
    // Programm schlägt als Änderungsoption beide Eingänge vor
    //
  }, [debouncedSearch, setLocations]);
}

export default (zipcode, Map);
