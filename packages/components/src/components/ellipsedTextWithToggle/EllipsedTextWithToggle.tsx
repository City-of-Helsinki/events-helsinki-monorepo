import classNames from 'classnames';
import { useAccordion } from 'hds-react';
import React from 'react';
import styles from './ellipsedTextWithToggle.module.scss';

type Props = {
  lines: string[];
  className?: string;
  button?: React.ElementType<React.HTMLProps<HTMLButtonElement>> | string;
  initialVisibleLinesCount?: number;
};

export default function EllipsedTextWithToggle({
  lines,
  className,
  button: Button = 'button',
  initialVisibleLinesCount = 3,
}: Props) {
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });

  const firstLines = lines.slice(0, initialVisibleLinesCount).join('\n');
  const restOfLines = lines.slice(initialVisibleLinesCount).join('\n');

  return (
    <span className={classNames(styles.container, className)}>
      {firstLines}
      {lines.length > initialVisibleLinesCount && (
        <>
          {'\n'}
          {isOpen && (
            <div aria-hidden={!isOpen} {...contentProps}>
              {restOfLines}
            </div>
          )}

          <Button
            type="button"
            className={styles.button}
            data-open={isOpen.toString()}
            {...buttonProps}
          >
            {!isOpen ? 'show_long_price' : 'hide_long_price'}
          </Button>
        </>
      )}
    </span>
  );
}
