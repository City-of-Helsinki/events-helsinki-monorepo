import { screen, render } from '@/test-utils';
import App from '../../src/pages/index';

describe('App', () => {
  it.skip('renders without crashing', () => {
    render(<App page={undefined} locale={'fi'} preview={false} />);
    expect(screen.getByText('Hobbies-Helsinki')).toBeInTheDocument();
  });
});
