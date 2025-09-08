import { act, renderHook } from '@testing-library/react';
import type { GraphQLFormattedError } from 'graphql';
import { describe, expect, it } from 'vitest';
import useApolloErrorHandler from '../useApolloErrorHandler';

describe('useApolloErrorHandler', () => {
  it('should have a correct initial state', () => {
    const { result } = renderHook(() => useApolloErrorHandler());
    expect(result.current.showErrorNotification).toBe(false);
  });

  it('should show notification when an error is added', () => {
    const { result } = renderHook(() => useApolloErrorHandler());
    const error: GraphQLFormattedError = { message: 'Test error' };

    act(() => {
      result.current.handleError(error);
    });

    expect(result.current.showErrorNotification).toBe(true);
  });

  it('should hide notification when errors are cleared via onCloseErrorHandler', () => {
    const { result } = renderHook(() => useApolloErrorHandler());
    const error: GraphQLFormattedError = { message: 'Test error' };

    // Add an error to show the notification
    act(() => {
      result.current.handleError(error);
    });
    expect(result.current.showErrorNotification).toBe(true);

    // Close the handler to clear errors and hide the notification
    act(() => {
      result.current.onCloseErrorHandler();
    });
    expect(result.current.showErrorNotification).toBe(false);
  });

  it('should keep the notification visible when multiple unique errors are added', () => {
    const { result } = renderHook(() => useApolloErrorHandler());
    const error1: GraphQLFormattedError = { message: 'First error' };
    const error2: GraphQLFormattedError = { message: 'Second error' };

    act(() => {
      result.current.handleError(error1);
      result.current.handleError(error2);
    });

    expect(result.current.showErrorNotification).toBe(true);
  });
});
