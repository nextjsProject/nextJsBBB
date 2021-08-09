// Kopie als _rest-api im Hauptverzeichnis
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/dist/client/router';

// slug ist dynamischer Platzhalter
const graphQlPath = 'https://react.webworker.berlin/graphql';

/* Vorbereitung zum Abholen der Blogdaten -> Info welche Daten von welcher Seite
-> Wenn man einen dynamischen Pfad hat, muss man Next mitteilen,
welche Pfade das System statisch generieren soll, hier also
eine Liste der vorhanden Blog-Slugs übergeben. 
*/
export async function getStaticPaths() {
  // da es nicht genutzt wurde, muss es fürs Compilieren auskommentiert werden
  let paths = [];

  try {
    const query = `{
      posts {
        nodes {
          slug
        }
      }
    }`;

    // zum Testen:
    // https://react.webworker.berlin/graphql?query={posts{nodes{slug}}}
    // wenn es nicht genutzt wurde, muss es fürs Compilieren auskommentiert werden
    const response = await fetch(`${graphQlPath}?query=${query}`);
    //
    // wenn es nicht genutzt wurde, muss es fürs Compilieren auskommentiert werden
    const posts = await response.json();
    //
    /*	
    Die Einträge im paths-Array müssen den params entsprechen,
  	die getStaticProps erhält. 
    Bild-Daten sind in einer Unterseite enthalten -> media + id -> und müssen in einer extra function ausgelesen werden
      */
    // wenn es nicht genutzt wurde, muss es fürs Compilieren auskommentiert werden
    paths = posts.data.posts.nodes.map(({ slug }) => ({ params: { slug } }));
  } catch (e) {
    console.log(e);
  }

  return { paths, fallback: true };
  /* 
  fallback legt fest, dass ein neuer und noch nicht in paths
  enthaltene Slug frisch von WordPress geholt werden soll.
  Wenn man für paths einen leeren Array zurückgibt, werden
  also alle Blogbeiträge erst statisch generiert, wenn sie
  zum ersten Mal angefordert werden. Man könnte in paths
  auch nur z.B. die 20 neuesten Blogbeiträge übergeben. 
  Alles oben kann bei dieser Variante entfallen !
  -> damit wird aber das Vorabladen verhindert 
  -> Performance-Problem !
  */
  // return { paths: [], fallback: true };
}

// aus getStaticPaths werden params an getStaticProps übergeben
// id des Blogs ist nicht bekannt, stattdessen der slug (mit Kopplung und klein geschriebener Titel)
export async function getStaticProps({ params }) {
  console.log(params);

  // für Abfragen
  let post = {};

  try {
    const data = `{
      post(id: "${params.slug}", idType: SLUG) {
      title
      content
      featuredImage {
        node {
          altText
          guid
          mediaDetails {
            height
            width
          }
        }
      }
      }
    }`;

    const response = await fetch(`${graphQlPath}?query=${data}`);

    const responseObject = await response.json();
    post = responseObject.data.post;

    // prüfen, ob in featured media (Bildeintrag) eine id eingetragen ist
    // die Bild-Daten benötigen eine zweite Anfrage
    if (post.featuredImage) {
      post.titleImage = {
        src: post.featuredImage.node.guid,
        width: post.featuredImage.node.guid.mediaDetails.width,
        height: post.featuredImage.node.guid.mediaDetails.height,
        alt: post.featuredImage.node.guid.altText,
      };
    }
  } catch (error) {
    console.log('Problem bei Blog-Daten-Abfrage aufgetreten.');
  }
  return {
    props: { post },
    revalidate: 3600,
  };
}

export default function BlogPost({ post }) {
  // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  // wenn eine url aufgerufen wird, die noch nicht bekannt ist, dann Laden... anzeigen
  const router = useRouter();
  if (router.isFallback) {
    return <strong>Laden...</strong>;
  }

  console.log(post);

  const { title, content, featuredImage } = post;
  return (
    <Layout title={title}>
      {featuredImage && (
        <Image
          src={featuredImage.node.guid}
          alt={featuredImage.node.altText}
          width={featuredImage.node.mediaDetails.width}
          height={featuredImage.node.mediaDetails.height}
          layout="responsive"
          sizes="(max-width: 50rem) 100vw, 50rem"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Link href="../blog">zurück</Link>
    </Layout>
  );
}
