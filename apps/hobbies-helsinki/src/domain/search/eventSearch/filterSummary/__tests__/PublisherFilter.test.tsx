import * as React from 'react';

import {
  render,
  waitFor,
  act,
  screen,
  userEvent,
} from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeOrganization } from '@/test-utils/mockDataUtils';
import { OrganizationDetailsDocument } from '../../../../nextApi/graphql/generated/graphql';
import PublisherFilter from '../PublisherFilter';

const id = '1';
const name = 'Organization name';
const organization = fakeOrganization({ id, name });
const organizationResponse = { data: { organizationDetails: organization } };

const request = {
  query: OrganizationDetailsDocument,
  variables: {
    id,
  },
};

const mocks = [
  {
    request,
    result: organizationResponse,
  },
];

it('matches snapshot', async () => {
  const { container } = render(
    <PublisherFilter id={id} onRemove={jest.fn()} />,
    { mocks }
  );

  await screen.findByText(name);
  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', async () => {
  const onClickMock = jest.fn();
  render(<PublisherFilter id={id} onRemove={onClickMock} />, { mocks });

  await screen.findByText(name);

  await act(() =>
    userEvent.click(
      screen.getByRole('button', {
        name: translations.common.filter.ariaButtonRemove.replace(
          '{{filter}}',
          name
        ),
      })
    )
  );

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(id, 'publisher');
});

it("should return null if place doesn't exist", async () => {
  const mocks = [
    {
      request,
      error: new Error('not found'),
    },
  ];

  const { container } = render(
    <PublisherFilter id={id} onRemove={jest.fn()} />,
    {
      mocks,
    }
  );

  await waitFor(() => {
    expect(
      screen.queryByText(translations.common.loading)
    ).not.toBeInTheDocument();
  });

  expect(container.innerHTML).toBe('');
});
