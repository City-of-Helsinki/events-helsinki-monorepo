import classNames from 'classnames';
import {
  IconSize,
  type IconProps,
  type NumberInputProps,
  type TextInputProps,
} from 'hds-react';
import React from 'react';

import styles from './advancedSearchInput.module.scss';
import useMoveFocusFromInputToContainer from './useMoveFocusFromInputToContainer';

/**
 * @typeParam ComponentType The type of the props for the InputComponent.
 * Must extend TextInputProps or NumberInputProps.
 */
export type AdvancedSearchInputProps<
  ComponentType extends TextInputProps | NumberInputProps,
> = {
  /**
   * The icon component to be rendered inside the input container.
   * It should be a React element, e.g. <IconSearch />.
   */
  IconComponent: React.ReactElement<IconProps>;
  /**
   * The input component to be rendered.
   * It should be a React element, e.g. <TextInput /> or <NumberInput />.
   */
  InputComponent: React.ReactElement<ComponentType>;
};

/**
 * AdvancedSearchInput is a component that wraps an icon and an input field.
 * It provides styling for focus and handles focus management between the
 * container and the input field. It accepts an IconComponent and an InputComponent
 * as React elements and injects necessary props into them, preserving any
 * original props.
 * @param props The component props.
 * @returns The rendered component.
 */
function AdvancedSearchInput<
  ComponentType extends TextInputProps | NumberInputProps,
>({
  IconComponent,
  InputComponent,
}: AdvancedSearchInputProps<ComponentType>): React.ReactElement {
  const {
    containerRef,
    inputRef,
    isFocused,
    setFocusToInput,
    onInputFocus,
    onInputBlur,
  } = useMoveFocusFromInputToContainer();

  // Extend the original focus handlers
  const handleOnInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    InputComponent.props.onFocus?.(event);
    onInputFocus();
  };

  // Extend the original blur handlers
  const handleOnInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    InputComponent.props.onBlur?.(event);
    onInputBlur();
  };

  return (
    <div
      ref={containerRef}
      className={classNames(
        styles.advancedSearchInputContainer,
        isFocused && styles.focused
      )}
      onClick={setFocusToInput}
    >
      <div className={styles.iconWrapper}>
        {React.cloneElement(IconComponent, {
          ...IconComponent.props,
          size: IconSize.Small,
          'aria-hidden': true,
        })}
      </div>
      <div className={styles.inputWrapper}>
        {React.cloneElement(InputComponent, {
          ...InputComponent.props,
          ref: inputRef,
          onFocus: handleOnInputFocus,
          onBlur: handleOnInputBlur,
        })}
      </div>
    </div>
  );
}

export default AdvancedSearchInput;
