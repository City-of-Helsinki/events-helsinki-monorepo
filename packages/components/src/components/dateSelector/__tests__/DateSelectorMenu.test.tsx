import * as React from 'react';
import { render } from '@/test-utils';
import { DATE_TYPES } from '../../../constants';
import DateSelectorMenu from '../DateSelectorMenu';

it('matches snapshot', () => {
  const { container } = render(
    <DateSelectorMenu
      dateTypes={['type1', 'type2']}
      dateTypeOptions={[
        DATE_TYPES.TODAY,
        DATE_TYPES.TOMORROW,
        DATE_TYPES.THIS_WEEK,
        DATE_TYPES.WEEKEND,
      ]}
      endDate={new Date('2019-09-31')}
      isCustomDate={false}
      isOpen={true}
      name="date"
      onChangeDateTypes={vi.fn()}
      onChangeEndDate={vi.fn()}
      onChangeStartDate={vi.fn()}
      onCloseMenu={vi.fn()}
      startDate={new Date('2019-08-01')}
      toggleIsCustomDate={vi.fn()}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
