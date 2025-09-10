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
        askemFeedbackConfiguration={{}}
        asPath="/"
        withConsent={false}
        headerMenu={undefined}
        headerUniversalBarMenu={undefined}
        footerMenu={undefined}
        languages={[]}
        defaultButtonTheme="default"
        defaultButtonVariant="primary"
        getCardUrl={() => ''}
        getEventUrl={() => ''}
        getEventListLinkUrl={() => ''}
        getOrganizationSearchUrl={() => ''}
        getHelsinkiOnlySearchUrl={() => ''}
        getPlainEventUrl={() => ''}
        getKeywordOnClickHandler={(_router, _locale, _type, _value) => () => {}}
        _nextI18Next={undefined}
      >
        <div data-testid="child">Hello</div>
      </BaseApp>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });
});
