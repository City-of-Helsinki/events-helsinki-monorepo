import { render, screen, userEvent, waitFor } from '@/test-utils';
import ApolloErrorNotification from '../ApolloErrorNotification';

describe('ApolloErrorNotification', () => {
  const user = userEvent.setup();

  it('renders properly', async () => {
    render(<ApolloErrorNotification onClose={jest.fn()} />);
    await screen.findByRole('alert', {
      name: /notification/i,
    });
    expect(
      screen.getByText(/sivustolla havaittiin yhteysongelmia!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /koita myöhemmin uudestaan\. jos tilanne toistuu, kerro siitä meille/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /sulje/i,
      })
    ).toBeInTheDocument();
  });

  it('calls onClose callback when closed', async () => {
    const onCloseSpy = jest.fn();
    render(<ApolloErrorNotification onClose={onCloseSpy} />);
    await user.click(
      await screen.findByRole('button', {
        name: /sulje/i,
      })
    );
    await waitFor(() => {
      expect(onCloseSpy).toHaveBeenCalled();
    });
  });
});
