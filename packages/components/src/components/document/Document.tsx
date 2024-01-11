import * as hds from 'hds-react';
import { getCriticalHdsRules } from 'hds-react';
import NextJsDocument, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentProps } from 'next/document';

type Props = {
  hdsCriticalRules: string;
} & DocumentProps;

/**
 * @deprecated because it duplicates the code on ISR / SSG pages. Use the Document from 'next/document' (with all the HDS styles imported in the _app.tsx) instead.
 * See more: https://hds.hel.fi/foundation/guidelines/server-side-rendering/#how-does-hds-support-server-side-rendering
 * and https://github.com/theKashey/used-styles.
 */
class Document extends NextJsDocument<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextJsDocument.getInitialProps(ctx);
    const hdsCriticalRules = await getCriticalHdsRules(
      initialProps.html,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (hds as any).hdsStyles
    );

    return { ...initialProps, hdsCriticalRules };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Render HDS Critical Rules as inline style for fast parsing and preventing some flickering that may occur. */}
          <style
            data-used-styles
            dangerouslySetInnerHTML={{ __html: this.props.hdsCriticalRules }}
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
