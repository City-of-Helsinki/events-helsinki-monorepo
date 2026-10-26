import { translations } from '@events-helsinki/common-i18n';
import { vi } from 'vitest';
import { render, waitFor, screen, userEvent } from '@/test-utils';
import { fakeOrganization } from '@/test-utils/mockDataUtils';
import { OrganizationDetailsDocument } from '../../../types';
import OrganizationFilter from '../OrganizationFilter';

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

it('shows a loading filter while the organization query is in flight', () => {
  render(<OrganizationFilter id={id} onRemove={vi.fn()} />, {
    mocks: [
      {
        request,
        result: organizationResponse,
        delay: Number.POSITIVE_INFINITY,
      },
    ],
  });

  expect(screen.getByText(translations.common.loading)).toBeInTheDocument();
});

it('matches snapshot', async () => {
  const { container } = render(
    <OrganizationFilter id={id} onRemove={vi.fn()} />,
    {
      mocks,
    }
  );

  await screen.findByText(name);
  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', async () => {
  const onClickMock = vi.fn();
  render(<OrganizationFilter id={id} onRemove={onClickMock} />, { mocks });

  await screen.findByText(name);

  await userEvent.click(
    screen.getByRole('button', {
      name: translations.common.filter.ariaButtonRemove.replace(
        '{{filter}}',
        name
      ),
    })
  );

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(id, 'organization');
});

it('returns null when the organization cannot be loaded', async () => {
  const { container } = render(
    <OrganizationFilter id={id} onRemove={vi.fn()} />,
    {
      mocks: [
        {
          request,
          error: new Error('not found'),
        },
      ],
    }
  );

  await waitFor(() => {
    expect(
      screen.queryByText(translations.common.loading)
    ).not.toBeInTheDocument();
  });

  expect(container.innerHTML).toBe('');
});

it('returns null when the organization has no name', async () => {
  const { container } = render(
    <OrganizationFilter id={id} onRemove={vi.fn()} />,
    {
      mocks: [
        {
          request,
          result: {
            data: {
              organizationDetails: fakeOrganization({ id, name: '' }),
            },
          },
        },
      ],
    }
  );

  await waitFor(() => {
    expect(
      screen.queryByText(translations.common.loading)
    ).not.toBeInTheDocument();
  });

  expect(container.innerHTML).toBe('');
});
