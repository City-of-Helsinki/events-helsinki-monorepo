import * as Reducer from '@events-helsinki/components/components/apolloErrorNotification/apolloErrorsReducer';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../config/vitest/test-utils';
import EventsApolloProvider from '../EventsApolloProvider';
const clearErrorsMock = vi.fn();
const useApolloErrorsReducerMock = vi
  .fn()
  .mockReturnValue([[new Error('1st error')], clearErrorsMock]);

const renderProvider = () => {
  return render(
    <EventsApolloProvider>
      <div data-testid="EventsApolloProvider">{'EventsApolloProvider'}</div>
    </EventsApolloProvider>
  );
};

describe('EventsApolloProvider', () => {
  const user = userEvent.setup();

  describe('ApolloErrorNotification', () => {
    it('does not render when there are no errors', async () => {
      renderProvider();
      expect(screen.getByTestId('EventsApolloProvider')).toBeInTheDocument();
      expect(
        screen.queryByRole('alert', {
          name: /notification/i,
        })
      ).not.toBeInTheDocument();
    });
    it('renders ApolloErrorNotification on Apollo-Client errors', async () => {
      vi.spyOn(Reducer, 'useApolloErrorsReducer').mockImplementationOnce(
        useApolloErrorsReducerMock
      );
      renderProvider();
      expect(screen.getByTestId('EventsApolloProvider')).toBeInTheDocument();
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
