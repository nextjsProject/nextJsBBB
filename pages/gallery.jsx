// nextjs bietet Abkürzungen für Importpfade
// statt: import Layout from '../components/Layout';
import Layout from '@/components/Layout';
import Image from 'next/image';
// in jsconfig.json ist Pfadangabe mit @ eingetragen und wird hier automatisch vorgeschlagen
// mit dem Bildimport an dieser Stelle kann auf die Angabe von width und height verzichtet werden
import hongKong from '@/img/hong-kong.jpg';

export default function gallery() {
  return (
    <Layout title="Gallery">
      <p>
        <img
          className="image"
          src="/img/logo@2x.jpg"
          srcSet="/img/logo@1x.jpg 1x, /img/logo@2x.jpg 2x"
          // verzögertes Laden für besseren Bildaufbau und weniger Speichernutzung
          loading="lazy"
          // width und height für den Browser angeben -> Berechnung Seitenverhältnis
          width="320"
          height="100"
          alt="Logo Schoenlein"
          title="Logo Schoenlein"
        />
      </p>
      <p>
        <img
          className="image"
          src="https://picsum.photos/id/1011/900/450"
          srcSet="https://picsum.photos/id/1011/450/225 450w, https://picsum.photos/id/1011/900/450 900w, https://picsum.photos/id/1011/1350/675 1350w, https://picsum.photos/id/1011/1800/900 1800w"
          // verzögertes Laden für besseren Bildaufbau und weniger Speichernutzung
          sizes="(max-width: 52rem) 90vw, 50rem"
          loading="lazy"
          // width und height für den Browser angeben -> Berechnung Seitenverhältnis
          width="2"
          height="1"
          alt="im Boot"
          title="im Boot"
        />
      </p>
      <picture>
        <source
          media="(max-width: 30rem) and (orientation: portrait)"
          srcSet="/img/header-image-portrait.jpg"
        />
        <source
          media="(max-width: 40rem) and (orientation: portrait)"
          srcSet="/img/header-image-square.jpg"
        />
        <img
          className="image"
          src="/img/header-image-landscape@1000.jpg"
          srcSet="/img/header-image-landscape@1000.jpg 1000w,/img/header-image-landscape@1500.jpg 1500w,/img/header-image-landscape@2000.jpg 2000w"
          sizes="(max-width: 52rem) 90vw, 50rem"
          loading="lazy"
          alt="Mann am Strand"
          title="Mann am Strand"
        />
      </picture>
      <picture>
        <source srcSet="/img/herbst.webp" type="image/webp" />
        <img
          className="image"
          src="/img/herbst.jpg"
          loading="lazy"
          width="4"
          height="3"
          alt="Herbstlaub"
          title="Herbstlaub"
        />
      </picture>
      {/* Image-Element benötigt unbedingt sizes.
      Bei width und height kommt es vor allem auf das richtige Seitenverhältnis an.
      Mit layout="responsive" werden automatisch größere und kleinere Versionen erzeugt.
      Das Ausgabeformat ist webp. 
      */}
      <Image
        // Wenn man ein Bild, das auf dem Server liegt, zuvor importiert
        // und bei src einsetzt, kann man width und height weglassen.
        src={hongKong}
        // src="/img/hong-kong.jpg"
        // width={5184}
        // height={3456}
        sizes="(max-width: 52rem) 90vw, 50rem"
        layout="responsive"
        placeholder="blur"
        alt="Hong-Kong mit Bergen im Hintergrund"
        title="Hong-Kong mit Bergen im Hintergrund"
      />
    </Layout>
  );
}
