import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import AskemContext from '../AskemContext';
import type { AskemInstance } from '../types';
import useAskem from '../useAskem';

describe('useAskem', () => {
  it('should return undefined values when used outside of AskemProvider', () => {
    const { result } = renderHook(() => useAskem());

    expect(result.current.disabled).toBeUndefined();
    expect(result.current.consentGiven).toBeUndefined();
    // Calling setRnsConfigValue should not throw an error
    expect(() =>
      result.current.setRnsConfigValue('test', 'value')
    ).not.toThrow();
  });

  it('should return values from the context', () => {
    const mockInstance: AskemInstance = {
      disabled: true,
      consentGiven: false,
      setRnsConfigValue: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AskemContext.Provider value={mockInstance}>
        {children}
      </AskemContext.Provider>
    );

    const { result } = renderHook(() => useAskem(), { wrapper });

    expect(result.current.disabled).toBe(true);
    expect(result.current.consentGiven).toBe(false);
  });

  it('should call setRnsConfigValue from the context instance', () => {
    const mockSetRnsConfigValue = vi.fn();
    const mockInstance: AskemInstance = {
      disabled: false,
      consentGiven: true,
      setRnsConfigValue: mockSetRnsConfigValue,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AskemContext.Provider value={mockInstance}>
        {children}
      </AskemContext.Provider>
    );

    const { result } = renderHook(() => useAskem(), { wrapper });

    act(() => {
      result.current.setRnsConfigValue('propName', 'propValue');
    });

    expect(mockSetRnsConfigValue).toHaveBeenCalledWith('propName', 'propValue');
    expect(mockSetRnsConfigValue).toHaveBeenCalledTimes(1);
  });
});
