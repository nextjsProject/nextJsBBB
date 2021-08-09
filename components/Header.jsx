// import Image from 'next/image';
import Navigation from './Navigation';

export default function Header({ title }) {
  return (
    <header className="site-header inner-width">
      {/**
      eslint schlägt Image statt img als bevorzugte Lösung vor 
      -> ist deaktiviert, geht jetzt beides 
      */}
      <div className="site-header__logo">
        <div className="site-header__logo-bild">
          <img
            src="/img/logo-bildteil.jpg"
            srcSet="/img/logo-bildteil.jpg 1x, /img/logo-bildteil.jpg 2x"
            // verzögertes Laden für besseren Bildaufbau und weniger Speichernutzung
            // width und height für den Browser angeben -> Berechnung Seitenverhältnis
            width="150vw"
            height="100%"
            loading="lazy"
            alt="Logo"
            title="Logo"
          />
        </div>
        <div className="site-header__logo-text"></div>
      </div>
      <Navigation />
      <h1>{title}</h1>
    </header>
  );
}
