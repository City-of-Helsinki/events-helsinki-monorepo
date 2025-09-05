import { render, screen } from '@testing-library/react';
import BaseApp from '../BaseApp';

describe('BaseApp', () => {
  it('renders children', () => {
    render(
      <BaseApp
        // Provide minimal required props, can use empty objects or dummy functions
        cmsHelper={{} as any}
        cookieDomain=""
        routerHelper={{} as any}
        appName="TestApp"
        matomoConfiguration={
          {
            urlBase: 'https://matomo.example.com/',
            siteId: '1',
          } as any
        }
        askemFeedbackConfiguration={{} as any}
        asPath="/"
        withConsent={false}
        // @ts-expect-error ts(2322)
        headerMenu={[]}
        // @ts-expect-error ts(2322)
        headerUniversalBarMenu={[]}
        // @ts-expect-error ts(2322)
        footerMenu={[]}
        languages={[]}
        // @ts-expect-error ts(2322)
        defaultButtonTheme="primary"
        // @ts-expect-error ts(2322)
        defaultButtonVariant="contained"
        getCardUrl={() => ''}
        getEventUrl={() => ''}
        getEventListLinkUrl={() => ''}
        getOrganizationSearchUrl={() => ''}
        getHelsinkiOnlySearchUrl={() => ''}
        getPlainEventUrl={() => ''}
        // @ts-expect-error ts(2322)
        getKeywordOnClickHandler={() => {}}
        // @ts-expect-error ts(2322)
        _nextI18Next={{}}
        locale="en"
        locales={['en']}
        defaultLocale="en"
      >
        <div data-testid="child">Hello</div>
      </BaseApp>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });
});
