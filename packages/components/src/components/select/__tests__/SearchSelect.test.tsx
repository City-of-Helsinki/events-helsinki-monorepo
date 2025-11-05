import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Option } from '../../../types';
import { AccessibilityProfile } from '../../../types';

import SearchSelect from '../SearchSelect';

const emptyOption: Option = { text: '', value: '' };
const accessibilityProfileOptions = [
  emptyOption,
  ...Object.values(AccessibilityProfile).map(
    (accessibility) => ({ text: accessibility, value: accessibility }) as Option
  ),
];

describe('SearchSelect', () => {
  describe('successful cases', () => {
    it('renders properly', () => {
      const { container } = render(
        <SearchSelect
          id="accessibilityProfile"
          texts={{ label: 'label', placeholder: 'placeholder' }}
          options={accessibilityProfileOptions}
        />
      );
      expect(
        screen.getByRole('combobox', {
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
          texts={{ label: 'label', placeholder: 'placeholder' }}
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
        screen.getByRole('combobox', {
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
        await screen.findByRole('option', { name: /rollator/i })
      );
      // The placeholder text is replaced with the selected option
      expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument();
      expect(screen.getAllByText(/rollator/i)).toHaveLength(2);
    });
  });

  describe('error cases', () => {
    // Suppress console.error output for expected errors
    // that can not be hidden with try/catch nor with React error boundary.
    beforeAll(() => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
      vi.restoreAllMocks();
    });

    it.each(['value'])('does not allow array as a %s', (field) => {
      expect(() =>
        render(
          <SearchSelect
            texts={{ label: 'label', placeholder: 'placeholder' }}
            options={[]}
            {...{ [field]: [] }}
          />
        )
      ).toThrow(/must be singletons/);
    });

    it('does not allow multiselect', () => {
      expect(() =>
        // @ts-ignore
        render(
          <SearchSelect
            texts={{ label: 'label', placeholder: 'placeholder' }}
            options={[]}
            multiSelect
          />
        )
      ).toThrow(/does not support multiselect feature/);
    });
  });
});
