import NextJsDocument, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentProps } from 'next/document';

type Props = {
  hdsCriticalRules: string;
} & DocumentProps;

class Document extends NextJsDocument<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render
    const initialProps = await NextJsDocument.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Render HDS Critical Rules as linked styles: 
              1. to use HDS styles as base styles 
              2. and to prevent some flickering that may occur.
              Inline style blocks would be faster, but when used with NextJS SSG,
              the linked style is better, so the style-block 
              is not duplicated on every statically generated file and the browser
              cache can be used.
              NOTE: A new version of the critical-hds-styles.css can be generated with
              the package scripts.
          */}
          <link
            rel="stylesheet"
            href="/shared-assets/styles/critical-hds-styles.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default Document;
