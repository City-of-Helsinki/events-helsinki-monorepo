import { createHash } from 'crypto';
import type { Venue, VenueConnection } from '@events-helsinki/components';
import React from 'react';
import { HtmlToReact, Link } from 'react-helsinki-headless-cms';
import styles from './venueHighlights.module.scss';

type HighlightConnection = Exclude<VenueConnection, 'sectionType' | 'name'> & {
  sectionType: 'HIGHLIGHT';
  name: NonNullable<VenueConnection['name']>;
};

function isHighlightConnection(
  connection: VenueConnection | null
): connection is HighlightConnection {
  return !!(connection?.sectionType === 'HIGHLIGHT' && connection?.name);
}

// Use hash to avoid SonarCloud code smell "Do not use Array index in keys", see
// https://rules.sonarsource.com/typescript/RSPEC-6479/
function venueHighlightKey(connection: HighlightConnection) {
  const hash = createHash('sha256').update(connection.name).toString();
  return `venue-highlight${hash}`;
}

const VenueHighlights = ({ venue: { connections } }: { venue: Venue }) => {
  const venueHighlightsContainer = React.useRef<HTMLDivElement | null>(null);
  const highlightConnections: HighlightConnection[] = connections.filter(
    isHighlightConnection
  );
  if (highlightConnections) {
    return (
      <div
        className={styles.venueHighlightsContainer}
        ref={venueHighlightsContainer}
      >
        {highlightConnections.map((connection) => (
          <div
            data-testid="venueHighlight"
            className={styles.venueHighlight}
            key={venueHighlightKey(connection)}
          >
            <HtmlToReact components={{ a: Link }}>
              {connection.name}
            </HtmlToReact>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default VenueHighlights;
