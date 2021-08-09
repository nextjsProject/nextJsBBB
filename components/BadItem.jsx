// https://www.badestellen.berlin.de/#/

// import Image from 'next/image';
// import { useToggle } from '../hooks/useToggle';

let baederID = 0;

export default function BadItem({ geometry, properties, countBadNo }) {
  // const [showDetails, toogleShowDetails] = useToggle(false);

  return (
    <article className="bad-item">
      <h3 className="bad-item__title">
        <a
          href={`https://www.badestellen.berlin.de/#/detail/${countBadNo}`}
          target="_blank"
          rel="noreferrer"
        >
          {properties.title}
        </a>
      </h3>
      <div>
        Quelle: LaGeSo
        <br />
        Datum: {new Date(properties.data.dat).toLocaleDateString()}
      </div>
      {/* <button onClick={toogleShowDetails}>
          {showDetails ? 'Weniger anzeigen' : 'Mehr anzeigen'}
        </button> */}
      <div className="bad-item__content">
        <img
          className="bad-item__image"
          src={properties.description}
          alt="Bild zur Nachricht"
          title="Bild zur Nachricht"
        />
        <p className="bad-item__description">
          {geometry.coordinates[1]}, {geometry.coordinates[0]}
        </p>
      </div>
    </article>
  );
}
