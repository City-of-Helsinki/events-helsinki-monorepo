import Head from 'next/head';

type BasicMetaProps = {
  title?: string;
  description?: string;
  favIconUrl?: string;
  appleTouchIconUrl?: string;
  manifestUrl?: string;
  favIconSvgUrl?: string;
};

function BasicMeta({
  title,
  description,
  favIconUrl,
  appleTouchIconUrl,
  manifestUrl,
  favIconSvgUrl,
}: BasicMetaProps) {
  return (
    <Head>
      {title && <meta property="title" content={title} />}
      {description && <meta property="description" content={description} />}
      {favIconUrl && <link rel="icon" href={favIconUrl} />}
      {favIconSvgUrl && (
        <link rel="icon" href={meta?.favIconSvgUrl} type="image/svg+xml" />
      )}
      {appleTouchIconUrl && (
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconUrl} />
      )}
      {manifestUrl && <link rel="manifest" href={manifestUrl} />}
    </Head>
  );
}

export default BasicMeta;
