import App from '../../src/pages/index';
import { screen, render } from './test-utils';

describe('App', () => {
  it.skip('renders without crashing', () => {
    render(<App page={undefined} locale={'fi'} previewToken="" />);
    expect(screen.getByText('Hobbies-Helsinki')).toBeInTheDocument();
  });
});
