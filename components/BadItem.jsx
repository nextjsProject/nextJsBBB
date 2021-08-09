// https://www.badestellen.berlin.de/#/

// import Image from 'next/image';
// import { useToggle } from '../hooks/useToggle';

let baederID = 0;

export default function BadItem({ geometry, properties }) {
  // const [showDetails, toogleShowDetails] = useToggle(false);

  return (
    <article className="bad-item">
      <h3 className="bad-item__title">
        <a
          href={`https://www.badestellen.berlin.de/#/detail/${baederID}`}
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
        />
        <p className="bad-item__description">
          {geometry.coordinates[1]}, {geometry.coordinates[0]}
        </p>
      </div>
    </article>
  );
}

// function count() {
//   for (let i = 0; i <= 78; i + 2) {
//     baederID = baederID + 2;
//     console.log(baederID);
//   }
// }
