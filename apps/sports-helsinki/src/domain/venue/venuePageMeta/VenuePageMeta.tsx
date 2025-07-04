import type { Venue } from '@events-helsinki/components';
import Head from 'next/head';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';

interface Props {
  venue: Venue;
}

const VenuePageMeta: React.FC<Props> = ({ venue }) => {
  const { meta } = useConfig();

  const title = venue.name || '';
  const description = venue.description || '';
  const image = venue.image || '';

  const openGraphProperties: Record<string, string> = {
    description: description,
    image: image,
    title: title,
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      {Object.entries(openGraphProperties).map(([property, value]) => (
        <meta key={property} property={`og:${property}`} content={value} />
      ))}
      <meta
        name="keywords"
        content={venue.ontologyWords
          .map((keyword) => keyword?.label?.toLowerCase())
          .filter((k) => k)
          .join(', ')}
      />
      <link rel="icon" href={meta?.favIconUrl} sizes="any" />
      <link rel="apple-touch-icon" href={meta?.appleTouchIconUrl} />
      <link rel="icon" href={meta?.favIconSvgUrl} type="image/svg+xml" />
      <link rel="manifest" href={meta?.manifestUrl} />
    </Head>
  );
};

export default VenuePageMeta;
