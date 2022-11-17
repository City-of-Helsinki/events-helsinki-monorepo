import Head from 'next/head';

type BasicMetaProps = {
  title?: string;
  description?: string;
  favIconUrl?: string;
  appleTouchIconUrl?: string;
};

function BasicMeta({
  title,
  description,
  favIconUrl,
  appleTouchIconUrl,
}: BasicMetaProps) {
  return (
    <Head>
      {title && <meta property="title" content={title} />}
      {description && <meta property="description" content={description} />}
      {favIconUrl && <link rel="icon" href={favIconUrl} />}
      {appleTouchIconUrl && (
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconUrl} />
      )}
    </Head>
  );
}

export default BasicMeta;
