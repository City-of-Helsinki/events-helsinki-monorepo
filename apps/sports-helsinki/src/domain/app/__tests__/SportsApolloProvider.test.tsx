import * as Reducer from '@events-helsinki/components/components/apolloErrorNotification/apolloErrorsReducer';
import { render, screen, userEvent, waitFor } from '@/test-utils';
import SportsApolloProvider from '../SportsApolloProvider';
const clearErrorsMock = jest.fn();
const useApolloErrorsReducerMock = jest
  .fn()
  .mockReturnValue([[new Error('1st error')], clearErrorsMock]);

jest.mock(
  '@events-helsinki/components/components/apolloErrorNotification/apolloErrorsReducer',
  () => ({
    __esModule: true,
    ...jest.requireActual(
      '@events-helsinki/components/components/apolloErrorNotification/apolloErrorsReducer'
    ),
  })
);
const renderProvider = () => {
  return render(
    <SportsApolloProvider>
      <div data-testid="SportsApolloProvider">{'SportsApolloProvider'}</div>
    </SportsApolloProvider>
  );
};

describe('SportsApolloProvider', () => {
  const user = userEvent.setup();

  describe('ApolloErrorNotification', () => {
    it('does not render when there are no errors', async () => {
      renderProvider();
      expect(screen.getByTestId('SportsApolloProvider')).toBeInTheDocument();
      expect(
        screen.queryByRole('alert', {
          name: /notification/i,
        })
      ).not.toBeInTheDocument();
    });
    it('renders ApolloErrorNotification on Apollo-Client errors', async () => {
      jest
        .spyOn(Reducer, 'useApolloErrorsReducer')
        .mockImplementationOnce(useApolloErrorsReducerMock);
      renderProvider();
      expect(screen.getByTestId('SportsApolloProvider')).toBeInTheDocument();
      await waitFor(() => {
        expect(useApolloErrorsReducerMock).toHaveBeenCalled();
      });
      expect(
        screen.getByRole('alert', {
          name: /notification/i,
        })
      ).toBeInTheDocument();
      user.click(
        screen.getByRole('button', {
          name: /sulje/i,
        })
      );
      await waitFor(() => {
        expect(clearErrorsMock).toHaveBeenCalled();
      });
    });
  });
});
