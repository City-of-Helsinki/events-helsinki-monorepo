import classNames from 'classnames';
import type { TextInputProps } from 'hds-react';
import { IconSearch, TextInput } from 'hds-react';
import React from 'react';

import styles from './advancedSearchTextInput.module.scss';
import useMoveFocusFromInputToContainer from './useMoveFocusFromInputToContainer';

function AdvancedSearchTextInput(props: TextInputProps) {
  const {
    containerRef,
    inputRef,
    isFocused,
    setFocusToInput,
    onInputFocus,
    onInputBlur,
  } = useMoveFocusFromInputToContainer();

  return (
    <div
      ref={containerRef}
      className={classNames(
        styles.advancedSearchTextInputContainer,
        isFocused && styles.focused
      )}
      onClick={setFocusToInput}
    >
      <div className={styles.iconWrapper}>
        <IconSearch size="s" aria-hidden />
      </div>
      <div className={styles.inputWrapper}>
        <TextInput
          {...props}
          ref={inputRef}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default AdvancedSearchTextInput;
