import Link from 'next/link';
import BadItem from './BadItem';

export default function BadList({ baederWeb, title = '' }) {
  return (
    <section className="bad-list">
      {title && (
        <h2 className="bad-list__title">
          <Link href="https://www.badestellen.berlin.de">
            <a
              target="_blank"
              rel="noreferrer"
              title="Link zur Informations-Quelle badestellen.berlin.de"
            >
              {title}
            </a>
          </Link>
        </h2>
      )}
      <div className="bad-grid">
        {baederWeb.map((feature) => (
          <BadItem key={feature.properties.id} {...feature} />
        ))}
      </div>
    </section>
  );
}
