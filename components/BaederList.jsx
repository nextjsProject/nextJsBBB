import Link from 'next/link';
import { useState } from 'react';
import BadItem from './BadItem';

export default function BadList({ baederWeb, title = '' }) {
  let countBadNo = 0;

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
        {baederWeb.map((feature, index) => {
          countBadNo = index + 2;
          return (
            <BadItem
              key={feature.properties.id}
              countBadNo={countBadNo}
              {...feature}
            />
          );
        })}
      </div>
    </section>
  );
}
