import { render, screen, fireEvent } from '@testing-library/react';
import router from 'next-router-mock';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import useConsentTranslation from '../../../hooks/useConsentTranslation';
import AskemFeedbackContainer from '../AskemFeedbackContainer';
import useAskem from '../useAskem';

// Mock the hooks and router
vi.mock('../useAskem');
vi.mock('../../../hooks/useConsentTranslation');
vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

const mockedUseAskem = vi.mocked(useAskem);
const mockedUseConsentTranslation = vi.mocked(useConsentTranslation);

describe('AskemFeedbackContainer', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock the translation hook to return a simple t function for testing
    mockedUseConsentTranslation.mockReturnValue({
      t: (key: string) => key,
    } as ReturnType<typeof useConsentTranslation>);
  });

  it('should render null when disabled', () => {
    mockedUseAskem.mockReturnValue({
      consentGiven: false,
      disabled: true,
      setRnsConfigValue: vi.fn(), // Mock with a function
    });
    const { container } = render(<AskemFeedbackContainer />);
    expect(container.firstChild).toBeNull();
  });

  it('should render CookiesRequired when consent is not given', () => {
    mockedUseAskem.mockReturnValue({
      consentGiven: false,
      disabled: false,
      setRnsConfigValue: vi.fn(), // Mock with a function
    });
    render(<AskemFeedbackContainer />);
    expect(
      screen.getByText('consent:askem.cookiesRequiredTitle')
    ).toBeInTheDocument();
    expect(
      screen.getByText('consent:askem.cookiesRequiredDescription')
    ).toBeInTheDocument();
  });

  it('should render the feedback container when consent is given', () => {
    mockedUseAskem.mockReturnValue({
      consentGiven: true,
      disabled: false,
      setRnsConfigValue: vi.fn(), // Mock with a function
    });
    const { container } = render(<AskemFeedbackContainer />);
    expect(container.querySelector('.rns')).toBeInTheDocument();
  });

  it('should handle consent page redirect when button is clicked', () => {
    const pushSpy = vi.spyOn(router, 'push');
    mockedUseAskem.mockReturnValue({
      consentGiven: false,
      disabled: false,
      setRnsConfigValue: vi.fn(), // Mock with a function
    });
    const consentUrl = '/cookie-consent';

    render(<AskemFeedbackContainer consentUrl={consentUrl} />);

    const consentButton = screen.getByRole('button');
    fireEvent.click(consentButton);

    expect(pushSpy).toHaveBeenCalledWith(consentUrl);
  });

  it('should not redirect if consentUrl is not provided', () => {
    const pushSpy = vi.spyOn(router, 'push');
    mockedUseAskem.mockReturnValue({
      consentGiven: false,
      disabled: false,
      setRnsConfigValue: vi.fn(), // Mock with a function
    });

    render(<AskemFeedbackContainer />);

    const consentButton = screen.getByRole('button');
    fireEvent.click(consentButton);

    expect(pushSpy).not.toHaveBeenCalled();
  });

  it('should apply withPadding style when withPadding prop is true', () => {
    mockedUseAskem.mockReturnValue({
      consentGiven: true,
      disabled: false,
      setRnsConfigValue: vi.fn(), // Mock with a function
    });
    const { container } = render(<AskemFeedbackContainer withPadding />);
    const containerElement = container.firstElementChild;
    expect(containerElement).toHaveClass(/rnsContainer/);
    expect(containerElement?.firstElementChild).toHaveClass(/withPadding/);
  });
});
