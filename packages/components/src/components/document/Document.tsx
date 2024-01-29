import * as hds from 'hds-react';
import { getCriticalHdsRules } from 'hds-react';
import NextJsDocument, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentProps } from 'next/document';

type Props = {
  hdsCriticalRules: string;
} & DocumentProps;

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
