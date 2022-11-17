import { useLocale, getEventFields } from 'events-helsinki-components';
import type { EventFields } from 'events-helsinki-components';
import Head from 'next/head';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';

interface Props {
  event: EventFields;
}

const EventPageMeta: React.FC<Props> = ({ event }) => {
  const locale = useLocale();

  const { meta } = useConfig();

  const {
    keywords,
    name,
    someImageUrl: image,
    shortDescription: description,
  } = getEventFields(event, locale);

  const openGraphProperties: { [key: string]: string } = {
    description: description,
    image: image,
    title: name,
  };

  return (
    <Head>
      <title>{name}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={keywords
          .map((keyword) => keyword.name.toLowerCase())
          .join(', ')}
      />
      <meta name="twitter:card" content="summary" />
      {Object.entries(openGraphProperties).map(([property, value]) => (
        <meta key={property} property={`og:${property}`} content={value} />
      ))}
      <link rel="icon" href={meta?.favIconUrl} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={meta?.appleTouchIconUrl}
      />
    </Head>
  );
};

export default EventPageMeta;
