//
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
// import cimdataLocations from '@/library/cimdataLocations';
import { getDistance } from '@/library/helpers';
import { useToggle } from '../hooks/useToggle';

// Mitte Deutschlands: "latitude":"51.2125","longitude":"9.4208"
const defaultCenter = { lat: 51.2125, lng: 9.4208 };
const defaultZoom = 6;

// const defaultCenter = { lat: 51.1864708, lng: 10.0671016 };
// const defaultZoom = 6;
// const myPosition = { lat: 51.2963, lng: 12.3935 };

export default function PLZFinder() {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [userLocation, setUserLocation] = useState(null);
  // const [locations, setLocations] = useState(cimdataLocations);
  const [locations, setLocations] = useState('');
  const [showDetails, toogleShowDetails] = useToggle(false);

  // Prüfen, ob das Gerät Geolocation unterstützt
  const navigatorAvailable = Boolean(window?.navigator?.geolocation);

  console.log('LocationFinder');

  // Leaflet liefert keine Karten
  // -> MapBox und maptiler (https://www.maptiler.com/) liefern kostenlose Karten
  // -> die Kartendaten kommen von OpenStreetMap
  return (
    <section className="leaflet">
      {/* Die Props von MapContainer werden nur beim ersten Rendern der Karte
    	berücksichtig, spätere Änderungen haben keine Auswirkung! */}
      <MapContainer
        // Center und Zoom werden nur beim ersten Rendern der Karte berücksichtigt und später nicht mehr berücksichtigt!
        // center={defaultCenter}
        center={mapCenter}
        // zoom={defaultZoom}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        {/* MapController hat Zugriff auf die Leaflet-Karte, Änderungen bei
      	den Props haben Auswirkungen. */}
        <MapController center={mapCenter} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*
    	Achtung: key für MarkerClusterGroup behebt einen Bug in der aktuellen Version. Ändernde Marker würden
     	sonst nicht aktualisiert werden. Mit key wird die Komponenente zum neu rendern gezwungen.
     	Testen, ob das in Zukunft noch nötig ist!
    	*/}
        <MarkerClusterGroup key={locations}>
          {/* locations basierten auf cimdata-Daten und ist jetzt leer */}
          {/* {locations.map(({ title, latLng }) => (
            <Marker key={title} position={latLng}>
              <Popup>{title}</Popup>
            </Marker>
          ))} */}
        </MarkerClusterGroup>

        {userLocation && (
          <Marker
            position={{
              lat: userLocation.coords.latitude,
              lng: userLocation.coords.longitude,
            }}
          >
            <Popup>
              <i>selbst</i>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </section>
  );
}

function MapController({ center, zoom }) {
  /* map enthält die Leaflet-Instanz. */
  const map = useMap();
  // console.log(map);

  /* Hier werden Methoden der Leaflet-Bibliothek verwendet, ganz unabhängig von React!
  https://leafletjs.com/reference-1.7.1.html#map-methods-for-modifying-map-state
  */

  useEffect(() => map.setView(center, zoom), [center, zoom, map]);
  return null;
}

function getUserLocation() {
  // https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  return new Promise((resolve, reject) => {
    // man
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

// function getLocationsInRadius(center, radius = 10) {
//   const locationsInRadius = cimdataLocations.filter(({ latLng }) => {
//     const distance = getDistance(
//       latLng.lat,
//       latLng.lng,
//       center.lat,
//       center.lng
//     );
//     return distance <= radius;
//   });
//   return locationsInRadius;
// }
