import { render, screen, waitFor } from '@testing-library/react';
import { ButtonPresetTheme, ButtonVariant } from 'hds-react';
import BaseApp from '../BaseApp';

describe('BaseApp', () => {
  it('renders children', async () => {
    render(
      <BaseApp
        // Provide minimal required props, can use empty objects or dummy functions
        cmsHelper={{} as any}
        cookieDomain=""
        routerHelper={{} as any}
        appName="TestApp"
        globalAppName="TestApp"
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
        defaultButtonTheme={ButtonPresetTheme.Coat}
        defaultButtonVariant={ButtonVariant.Primary}
        getCardUrl={() => ''}
        getEventUrl={() => ''}
        getEventListLinkUrl={() => ''}
        getOrganizationSearchUrl={() => ''}
        getHelsinkiOnlySearchUrl={() => ''}
        getPlainEventUrl={() => ''}
        getKeywordOnClickHandler={(_router, _locale, _type, _value) => () => {}}
        consentUrl={'/cookie-consent'}
      >
        <div data-testid="child">Hello</div>
      </BaseApp>
    );
    await waitFor(() => {
      expect(screen.getByTestId('child')).toHaveTextContent('Hello');
    });
  });
});
