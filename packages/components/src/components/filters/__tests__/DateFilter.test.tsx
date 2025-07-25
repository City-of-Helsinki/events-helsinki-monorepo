import userEvent from '@testing-library/user-event';
import { screen, render } from '@/test-utils';

import type { DateFilterProps } from '../DateFilter';
import DateFilter from '../DateFilter';

const props: DateFilterProps = {
  onRemove: vi.fn(),
  text: 'text',
  type: 'date',
  value: 'value',
};

it('matches snapshot', () => {
  const { container, rerender } = render(<DateFilter {...props} />);

  expect(container.firstChild).toMatchSnapshot();

  rerender(<DateFilter {...props} text="Some filter text" />);

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', async () => {
  const onClickMock = vi.fn();
  render(<DateFilter {...props} onRemove={onClickMock} />);

  expect(screen.getByText(props.text as string)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(props.value, props.type);
});
