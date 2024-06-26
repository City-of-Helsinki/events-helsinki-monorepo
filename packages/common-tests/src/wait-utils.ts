import { screen, waitFor } from '@testing-library/react';
export const waitForLoadingCompleted = async (): Promise<void> => {
  await waitFor(
    () => expect(screen.queryAllByTestId('loading-spinner')).toHaveLength(0),
    { timeout: 20_000 }
  );
  await waitFor(
    () =>
      expect(screen.queryAllByTestId('skeleton-loader-wrapper')).toHaveLength(
        0
      ),
    { timeout: 20_000 }
  );
};
