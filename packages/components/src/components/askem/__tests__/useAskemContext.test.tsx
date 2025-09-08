import { act, renderHook } from '@testing-library/react';
import { useCookies } from 'hds-react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import createAskemInstance from '../instance';
import type { AskemConfigs } from '../types';
import useAskemContext from '../useAskemContext';

// Mock dependencies
vi.mock('hds-react', async () => ({
  ...(await vi.importActual('hds-react')),
  useCookies: vi.fn(),
}));
vi.mock('../instance');

const mockedUseCookies = vi.mocked(useCookies);
const mockedCreateAskemInstance = vi.mocked(createAskemInstance);

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
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with no consent if cookies are not set', () => {
    mockedUseCookies.mockReturnValue({
      getAllConsents: () => ({}),
      getCookie: vi.fn(),
    });

    renderHook(() =>
      useAskemContext({
        cookieDomain: mockCookieDomain,
        asPath: '/initial-path',
        askemConfigurationInput: initialAskemConfig,
      })
    );

    // useEffect runs, handleConsentGiven is called, sets consent to false
    // The hook re-renders, and createAskemInstance is called
    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...initialAskemConfig,
      consentGiven: false,
    });
  });

  it('should initialize with consent if cookies are set', () => {
    mockedUseCookies.mockReturnValue({
      getAllConsents: () => ({
        // @ts-ignore ts(2322) - JSON string boolean
        askemBid: 'true',
        // @ts-ignore ts(2322) - JSON string boolean
        askemBidTs: 'true',
        // @ts-ignore ts(2322) - JSON string boolean
        askemReaction: 'true',
      }),
      getCookie: vi.fn(),
    });
    renderHook(() =>
      useAskemContext({
        cookieDomain: mockCookieDomain,
        asPath: '/initial-path',
        askemConfigurationInput: initialAskemConfig,
      })
    );

    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...initialAskemConfig,
      consentGiven: true,
    });
  });

  it('should update askem instance when consent is given via handleConsentGiven', () => {
    const getAllConsentsMock = vi
      .fn()
      .mockReturnValueOnce({}) // First call: no consent
      .mockReturnValueOnce({
        // Second call: consent given
        askemBid: 'true',
        askemBidTs: 'true',
        askemReaction: 'true',
      });

    mockedUseCookies.mockReturnValue({
      getAllConsents: getAllConsentsMock,
      getCookie: vi.fn(),
    });

    const { result } = renderHook(() =>
      useAskemContext({
        cookieDomain: mockCookieDomain,
        asPath: '/initial-path',
        askemConfigurationInput: initialAskemConfig,
      })
    );

    // Initial render with no consent
    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...initialAskemConfig,
      consentGiven: false,
    });
    expect(mockedCreateAskemInstance).toHaveBeenCalledTimes(1);

    // Simulate giving consent
    act(() => {
      result.current.handleConsentGiven();
    });

    // The hook should re-render and create a new instance with consent
    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...initialAskemConfig,
      consentGiven: true,
    });
    expect(mockedCreateAskemInstance).toHaveBeenCalledTimes(2);
  });

  it('should recreate instance when askemConfigurationInput changes', () => {
    mockedUseCookies.mockReturnValue({
      getAllConsents: () => ({}),
      getCookie: vi.fn(),
    });

    const { rerender } = renderHook(
      ({ askemConfigurationInput }) =>
        useAskemContext({
          cookieDomain: mockCookieDomain,
          asPath: '/path',
          askemConfigurationInput,
        }),
      { initialProps: { askemConfigurationInput: initialAskemConfig } }
    );

    // Initial render
    expect(mockedCreateAskemInstance).toHaveBeenCalledTimes(1);

    // Rerender with new config
    const newConfig = { ...initialAskemConfig, title: 'New Title' };
    rerender({ askemConfigurationInput: newConfig });

    // Hook should recreate the instance with the new config
    expect(mockedCreateAskemInstance).toHaveBeenCalledWith({
      ...newConfig,
      consentGiven: false,
    });
  });
});
