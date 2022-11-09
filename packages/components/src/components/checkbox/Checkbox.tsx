import type { CheckboxProps } from 'hds-react';
import { Checkbox as HdsCheckbox } from 'hds-react';
import React from 'react';

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const customStyles = {
      '--background-unselected': 'var(--color-white)',
      '--background-selected': 'var(--color-input-dark, --color-coat-of-arms)',
      '--background-selected-hover':
        'var(--color-input-dark, --color-coat-of-arms-dark)',
      '--background-hover':
        'var(--color-input-dark, --color-coat-of-arms-dark)',
      '--border-color-selected':
        'var(--color-input-dark,--color-coat-of-arms-dark)',
      '--border-color-selected-focus':
        'var(--color-input-dark, --color-coat-of-arms-dark)',
      '--border-color-selected-hover':
        'var(--color-input-dark,--color-coat-of-arms-dark)',
      lineHeight: '24px',
    } as React.CSSProperties;

    return (
      <HdsCheckbox
        {...props}
        style={customStyles}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
