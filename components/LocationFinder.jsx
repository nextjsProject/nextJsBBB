//
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import cimdataLocations from '@/library/cimdataLocations';
import { getDistance } from '@/library/helpers';
import { useToggle } from '../hooks/useToggle';

// const defaultCenter = { lat: 51.2963, lng: 12.3935 };
const defaultCenter = { lat: 52.51754, lng: 13.39144 };
const defaultZoom = 7;

// const defaultCenter = { lat: 51.1864708, lng: 10.0671016 };
// const defaultZoom = 6;
// const myPosition = { lat: 51.2963, lng: 12.3935 };

export default function LocationFinder() {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState(cimdataLocations);
  const [showDetails, toogleShowDetails] = useToggle(false);

  useEffect(() => {
    async function switchDisplay() {
      if (showDetails) {
        showUserLocation();
      } else {
        setMapCenter(defaultCenter);
        setZoom(defaultZoom);
        setLocations(cimdataLocations);
        setUserLocation(null);
      }
    }
    switchDisplay();
  }, [showDetails]);

  // Prüfen, ob das Gerät Geolocation unterstützt
  const navigatorAvailable = Boolean(window?.navigator?.geolocation);

  async function showUserLocation() {
    try {
      const location = await getUserLocation();

      setUserLocation(location);

      const userCenter = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      const locationsInRadius = getLocationsInRadius(userCenter);

      setLocations(locationsInRadius);

      setMapCenter(userCenter);
      setZoom(11);
    } catch (error) {
      // https://developer.mozilla.org/en-US/docs/Web/API/PositionError
      console.log(error);
    }
  }
  // https://de.reactjs.org/docs/faq-functions.html
  // showUserLocation();

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
    	Achtung: key für MarkerClusterGroup behebt einen Bug
     	in der aktuellen Version. Ändernde Marker würden
     	sonst nicht aktualisiert werden. Mit key
     	wird die Komponenente zum neu rendern gezwungen.
     	Testen, ob das in Zukunft noch nötig ist!
    	*/}
        <MarkerClusterGroup key={locations}>
          {locations.map(({ title, latLng }) => (
            <Marker key={title} position={latLng}>
              <Popup>{title}</Popup>
            </Marker>
          ))}
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
      {/* <button onClick={toogleShowDetails}> */}
      <button
        onClick={() => {
          toogleShowDetails();
        }}
      >
        {showDetails
          ? 'zeige alle Bäder'
          : 'zeige meinen Standort und Bäder in meiner Nähe'}
      </button>
      {showDetails && navigatorAvailable && (
        <>{userLocation && <UserLocation geoData={userLocation} />}</>
      )}
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

function UserLocation({ geoData }) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Coordinates
  const {
    timestamp,
    coords: {
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      latitude: lat,
      longitude: lng,
      speed,
    },
  } = geoData;

  return (
    <>
      <h2>Mein Standort</h2>
      <div>
        <dl>
          <dt>Längengrad</dt>
          <dd>{lng || 'Nicht verfügbar'}</dd>
          <dt>Breitengrad</dt>
          <dd>{lat || 'Nicht verfügbar'}</dd>
          <dt>Positionsgenauigkeit</dt>
          <dd>{accuracy || 'Nicht verfügbar'}</dd>
          <dt>Höhe</dt>
          <dd>{altitude || 'Nicht verfügbar'}</dd>
          <dt>Höhengenauigkeit</dt>
          <dd>{altitudeAccuracy || 'Nicht verfügbar'}</dd>
          <dt>Geschwindigkeit</dt>
          <dd>{speed || 'Nicht verfügbar'}</dd>
          <dt>Richtung</dt>
          <dd>{heading || 'Nicht verfügbar'}</dd>
          <dt>Zeitstempel</dt>
          <dd>{timestamp || 'Nicht verfügbar'}</dd>
        </dl>
      </div>
    </>
  );
}

function getLocationsInRadius(center, radius = 10) {
  const locationsInRadius = cimdataLocations.filter(({ latLng }) => {
    const distance = getDistance(
      latLng.lat,
      latLng.lng,
      center.lat,
      center.lng
    );
    return distance <= radius;
  });
  return locationsInRadius;
}
