// node-geonames installiert -> zum Fertigstellen siehe:
// https://www.npmjs.com/package/node-geonames-client

import Layout from '../components/Layout';

export default function home() {
  return (
    <Layout title="Home">
      {/* inner-HTML sind die Kindelemente, die als children ausgelesen werden */}
      <p>Websites mit NextJS</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est corporis
        similique iste, voluptatum maxime dolor pariatur quasi mollitia veniam
        atque! Sequi error esse, maiores ad quo suscipit. Similique laboriosam
        provident fugit sapiente sit, eveniet nesciunt modi non fuga. Quod
        adipisci distinctio reiciendis dolores a pariatur earum mollitia, harum
        facere delectus.
      </p>
    </Layout>
  );
}
