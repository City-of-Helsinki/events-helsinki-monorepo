import userEvent from '@testing-library/user-event';
import { render, screen } from '@/test-utils';

import TextFilter from '../TextFilter';

const props = {
  onRemove: jest.fn(),
  text: 'text',
};

it('matches snapshot', () => {
  const { container } = render(<TextFilter {...props} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', async () => {
  const onClickMock = jest.fn();
  render(<TextFilter {...props} onRemove={onClickMock} />);

  expect(screen.getByText(`${props.text}`)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(props.text, 'text');
});
