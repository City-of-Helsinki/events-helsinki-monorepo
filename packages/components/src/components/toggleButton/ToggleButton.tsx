import classNames from 'classnames';
import type { MutableRefObject } from 'react';
import React from 'react';

import styles from './toggleButton.module.scss';

type Props = {
  buttonRef?: MutableRefObject<HTMLButtonElement | null>;
  icon?: React.ReactElement;
  isSelected: boolean;
  isExpanded?: boolean;
  onClick: (value: string) => void;
  testId?: string;
  text: string;
  value: string;
} & Pick<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'aria-haspopup'
>;

const ToggleButton: React.FC<Props> = ({
  buttonRef,
  icon,
  isSelected,
  onClick,
  testId,
  text,
  value,
  isExpanded,
  'aria-haspopup': ariaHasPopup,
}) => {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <button
      ref={buttonRef}
      data-testid={testId}
      className={classNames(styles.toggleButton, {
        [styles.isSelected]: isSelected,
      })}
      aria-pressed={isSelected}
      aria-expanded={isExpanded}
      aria-haspopup={ariaHasPopup}
      aria-controls={buttonRef?.current?.id}
      aria-label={text}
      onClick={handleClick}
      type="button"
    >
      <div className={styles.innerWrapper}>
        {icon}
        <span>{text}</span>
      </div>
    </button>
  );
};

export default ToggleButton;
