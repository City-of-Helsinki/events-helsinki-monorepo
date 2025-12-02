import { renderHook } from '@testing-library/react';
import { useGroupConsent } from 'hds-react';

import useCookieConfigurationContext from '../../../cookieConfigurationProvider/useCookieConfigurationContext';
import createAskemInstance from '../instance';
import type { AskemConfigs } from '../types';
import useAskemContext from '../useAskemContext';

// Mock dependencies
vi.mock('hds-react', async () => ({
  ...(await vi.importActual('hds-react')),
  useGroupConsent: vi.fn(),
}));
vi.mock('../instance');

vi.mock('../../../cookieConfigurationProvider/useCookieConfigurationContext');

const mockedUseGroupConsent = vi.mocked(useGroupConsent);
const mockedCreateAskemInstance = vi.mocked(createAskemInstance);
const mockedUseCookieConfigurationContext = vi.mocked(
  useCookieConfigurationContext
);

const getMockAskemInstance = ({
  disabled = false,
  consentGiven = false,
} = {}) => ({
  setRnsConfigValue: vi.fn(),
  disabled,
  consentGiven,
});

describe('useAskemContext', () => {
  const initialAskemConfig: AskemConfigs = { apiKey: 'test-api-key' };
  const mockCookieDomain = 'test.hel.fi';

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    mockedCreateAskemInstance.mockImplementation((config) =>
      // @ts-expect-error: Mock implementation doesn't need all properties
      getMockAskemInstance(config)
    );
    mockedUseCookieConfigurationContext.mockReturnValue({
      cookieDomain: mockCookieDomain,
      askemConfiguration: initialAskemConfig,
      appName: {
        fi: 'events-helsinki-test',
        en: 'events-helsinki-test',
        sv: 'events-helsinki-test',
      },
      globalAppName: 'events-helsinki-test',
      consentUrl: '/cookie-consent',
      matomoConfiguration: {
        urlBase: '',
        siteId: 0,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with no consent if cookies are not set', () => {
    mockedUseGroupConsent.mockReturnValue(false);

    renderHook(() => useAskemContext());

    // useEffect runs, handleConsentGiven is called, sets consent to false
    // The hook re-renders, and createAskemInstance is called
    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...initialAskemConfig,
      consentGiven: false,
    });
  });

  it('should initialize with consent if cookies are set', () => {
    mockedUseGroupConsent.mockReturnValue(true);
    renderHook(() => useAskemContext());

    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...initialAskemConfig,
      consentGiven: true,
    });
  });

  it('should update askem instance when consent is given via handleConsentGiven', () => {
    mockedUseGroupConsent
      .mockReturnValueOnce(false) // First call: no consent
      .mockReturnValue(true);

    renderHook(() => useAskemContext());

    // Initial render with no consent
    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...initialAskemConfig,
      consentGiven: false,
    });
    // The hook should re-render and create a new instance with consent
    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...initialAskemConfig,
      consentGiven: true,
    });
    expect(mockedCreateAskemInstance).toHaveBeenCalledTimes(2);
  });

  it('should recreate instance when askemConfigurationInput changes', () => {
    const changedTitle = 'New Title';
    mockedUseCookieConfigurationContext.mockReturnValueOnce({
      cookieDomain: mockCookieDomain,
      askemConfiguration: { ...initialAskemConfig },
      appName: {
        fi: 'events-helsinki-test',
        en: 'events-helsinki-test',
        sv: 'events-helsinki-test',
      },
      globalAppName: 'events-helsinki-test',
      consentUrl: '/cookie-consent',
      matomoConfiguration: {
        urlBase: '',
        siteId: 0,
      },
    });
    mockedUseGroupConsent.mockReturnValue(false);

    const { rerender } = renderHook(() => useAskemContext());

    // Initial render
    expect(mockedCreateAskemInstance).toHaveBeenCalledTimes(2);

    const newConfig = { ...initialAskemConfig, title: changedTitle };

    mockedUseCookieConfigurationContext.mockReturnValue({
      cookieDomain: mockCookieDomain,
      askemConfiguration: newConfig,
      appName: {
        fi: 'events-helsinki-test',
        en: 'events-helsinki-test',
        sv: 'events-helsinki-test',
      },
      globalAppName: 'events-helsinki-test',
      consentUrl: '/cookie-consent',
      matomoConfiguration: {
        urlBase: '',
        siteId: 0,
      },
    });

    // Rerender with new config
    rerender();

    // Hook should recreate the instance with the new config
    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...newConfig,
      consentGiven: false,
    });
    expect(mockedCreateAskemInstance).toHaveBeenCalledTimes(3);
  });
});
