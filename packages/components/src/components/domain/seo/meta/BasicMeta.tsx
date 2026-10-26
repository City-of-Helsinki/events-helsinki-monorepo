import Head from 'next/head';

type BasicMetaProps = {
  readonly title?: string;
  readonly description?: string;
  readonly favIconUrl?: string;
  readonly appleTouchIconUrl?: string;
  readonly manifestUrl?: string;
  readonly favIconSvgUrl?: string;
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
        <link rel="icon" href={favIconSvgUrl} type="image/svg+xml" />
      )}
      {appleTouchIconUrl && (
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconUrl} />
      )}
      {manifestUrl && <link rel="manifest" href={manifestUrl} />}
    </Head>
  );
}

export default BasicMeta;
