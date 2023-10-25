import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Option } from '../../../types';
import { AccessibilityProfile } from '../../../types';

import SearchSelect from '../SearchSelect';
// eslint-disable-next-line import/no-unresolved

const emptyOption: Option = { text: '', value: '' };
const accessibilityProfileOptions = [
  emptyOption,
  ...Object.values(AccessibilityProfile).map(
    (accessibility) => ({ text: accessibility, value: accessibility } as Option)
  ),
];

describe('SearchSelect', () => {
  it('renders properly', () => {
    const { container } = render(
      <SearchSelect
        id="accessibilityProfile"
        label="label"
        placeholder="placeholder"
        options={accessibilityProfileOptions}
      />
    );
    expect(
      screen.getByRole('button', {
        name: /label/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/placeholder/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("lists the values when it's clicked", async () => {
    render(
      <SearchSelect
        id="accessibilityProfile"
        label="label"
        placeholder="placeholder"
        options={accessibilityProfileOptions}
      />
    );
    expect(await screen.findByText(/placeholder/i)).toBeInTheDocument();
    // No list items are shown
    accessibilityProfileOptions
      .slice(1)
      .forEach((option) =>
        expect(screen.queryByText(option.text)).not.toBeInTheDocument()
      );
    await userEvent.click(
      screen.getByRole('button', {
        name: /label/i,
      })
    );
    // All list items are shown
    accessibilityProfileOptions
      .slice(1)
      .forEach(async (option) =>
        expect(await screen.findByText(option.text)).toBeInTheDocument()
      );
    // Select one
    await userEvent.click(
      //   screen.getByRole('option', {
      //     name: /rollator/i,
      //   })
      screen.getByText(/rollator/i)
    );
    // The placeholder text is replaced with the selected option
    expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument();
    expect(screen.getByText(/rollator/i)).toBeInTheDocument();
  });

  it.each(['value', 'defaultValue'])(
    'does not allow array as a %s',
    (field) => {
      expect(() =>
        render(<SearchSelect label="label" options={[]} {...{ [field]: [] }} />)
      ).toThrow(/must be singletons/);
    }
  );

  it('does not allow multiselect', () => {
    expect(() =>
      // @ts-ignore
      render(<SearchSelect label="label" options={[]} multiselect />)
    ).toThrow(/does not support multiselect feature/);
  });
});
