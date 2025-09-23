import React from 'react';

/**
 * A React hook that manages focus state to visually outline a container element
 * when an input element inside it is focused. This is useful for creating a
 * custom focus style on a complex component like a search bar, where the
 * visual focus indicator should surround the entire component rather than just
 * the input field itself.
 *
 * @returns {object} An object containing refs, state, and event handlers to manage focus.
 * @returns {React.RefObject<HTMLDivElement>} return.containerRef A ref to be attached to the container element.
 * @returns {React.RefObject<HTMLInputElement>} return.inputRef A ref to be attached to the input element.
 * @returns {boolean} return.isFocused A state value that is `true` when the input is focused, and `false` otherwise.
 * Use this to conditionally apply a CSS class for focus styling.
 * @returns {() => void} return.setFocusToInput A function that programmatically focuses the input element.
 * This should be used on the `onClick` handler of the container.
 * @returns {() => void} return.onInputFocus An event handler to be attached to the `onFocus` prop of the input element.
 * @returns {() => void} return.onInputBlur An event handler to be attached to the `onBlur` prop of the input element.
 *
 * @example
 * ```jsx
 * import React from 'react';
 * import classNames from 'classnames';
 * import { IconSearch } from '@your-ui-library/icons';
 * import { TextInput } from '@your-ui-library/inputs';
 * import styles from './MyComponent.module.css';
 * import useMoveFocusFromInputToContainer from './useMoveFocusFromInputToContainer';
 *
 * function MyComponent(props) {
 * const {
 *   containerRef,
 *   inputRef,
 *   isFocused,
 *   setFocusToInput,
 *   onInputFocus,
 *   onInputBlur,
 * } = useMoveFocusFromInputToContainer();
 *
 * return (
 *   <div
 *     ref={containerRef}
 *     className={classNames(
 *       styles.searchContainer,
 *       isFocused && styles.focused
 *     )}
 *     onClick={setFocusToInput}
 *   >
 *     <div className={styles.iconWrapper}>
 *       <IconSearch size="s" aria-hidden />
 *     </div>
 *     <div className={styles.inputWrapper}>
 *       <TextInput
 *         {...props}
 *         ref={inputRef}
 *         onFocus={onInputFocus}
 *         onBlur={onInputBlur}
 *         autoComplete="off"
 *       />
 *     </div>
 *   </div>
 *   );
 * }
 *
 * export default MyComponent;
 * ```
 */
const useMoveFocusFromInputToContainer = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  /**
   * Programmatically focuses the input element,
   * which in turn triggers the `onInputFocus` handler.
   */
  const setFocusToInput = () => {
    inputRef.current?.focus();
  };

  /**
   * Handles the `onFocus` event of the input element.
   * It sets `isFocused` to `true`
   * to enable focus styling on the container.
   */
  const onInputFocus = () => {
    setIsFocused(true);
  };

  /**
   * Handles the `onBlur` event of the input element.
   * It sets `isFocused` to `false`
   * to remove focus styling from the container.
   */
  const onInputBlur = () => {
    setIsFocused(false);
  };

  return {
    containerRef,
    inputRef,
    isFocused,
    setFocusToInput,
    onInputFocus,
    onInputBlur,
  };
};

export default useMoveFocusFromInputToContainer;
