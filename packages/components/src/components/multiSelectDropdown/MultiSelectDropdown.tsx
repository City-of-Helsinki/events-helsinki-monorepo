import classNames from 'classnames';
import { IconAngleDown, IconAngleUp, IconSearch } from 'hds-react';
import React from 'react';

import useCommonTranslation from '../../hooks/useCommonTranslation';
import useDropdownKeyboardNavigation from '../../hooks/useDropdownKeyboardNavigation';
import type { Option } from '../../types/types';
import { skipFalsyType } from '../../utils/typescript.utils';
import Checkbox from '../checkbox/Checkbox';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import ScrollIntoViewWithFocus from '../scrollIntoViewWithFocus/ScrollIntoViewWithFocus';
import SearchLabel from '../search/searchLabel/SearchLabel';
import styles from './multiSelectDropdown.module.scss';
import type { MultiselectDropdownProps } from './types';

/**
 * Get the sorting key for a React element or string.
 * @param x The React element or string to get the sorting key for.
 * @returns Props of the React element as a string, or the input itself if it is a string.
 *
 * This function is used to create some consistent sorting for React elements.
 * Sorting by text content would be better, but sorting by props at least ensures some consistency.
 */
const getSortingKey = (x: React.ReactElement | string) =>
  typeof x === 'string' ? x : JSON.stringify(x.props);

/** Compare two React elements or strings for sorting. */
const reactElementOrStringCompare = (
  a: React.ReactElement | string | number,
  b: React.ReactElement | string | number
) => getSortingKey(a.toString()).localeCompare(getSortingKey(b.toString()));

const selectAll = 'SELECT_ALL';

const MultiSelectDropdown: React.FC<MultiselectDropdownProps> = ({
  checkboxName,
  icon,
  inputPlaceholder,
  inputValue,
  name,
  onChange,
  options,
  fixedOptions = [],
  renderOptionText,
  selectAllText,
  setInputValue,
  showSearch,
  showSelectAll,
  title,
  value,
  className,
  helpText,
  filterByInput = true,
  buttonStyles,
  showClearButton = false,
}) => {
  const { t } = useCommonTranslation();
  const inputPlaceholderText =
    (inputPlaceholder || t('common:multiSelectDropdown.inputPlaceholder')) ??
    '';
  const [internalInput, setInternalInput] = React.useState('');
  const [focusStyles, setFocusStyles] = React.useState(false);
  const input = inputValue ?? internalInput;

  const dropdown = React.useRef<HTMLDivElement | null>(null);
  const toggleButton = React.useRef<HTMLButtonElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const filteredOptions = React.useMemo<Option[]>((): Option[] => {
    const selectAllOption: Option | undefined = showSelectAll
      ? {
          text: selectAllText || t('common:multiSelectDropdown.selectAll'),
          value: selectAll,
        }
      : undefined;

    const result: Option[] = [];

    if (selectAllOption) {
      result.push(selectAllOption);
    }

    if (filterByInput) {
      result.push(
        ...options.filter((option) =>
          option.text.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      result.push(...options);
    }

    return result;
  }, [filterByInput, input, options, selectAllText, showSelectAll, t]);

  const handleInputValueChange = React.useCallback(
    (val: string) => {
      setInternalInput(val);

      if (setInputValue) {
        setInputValue(val);
      }
    },
    [setInputValue]
  );

  const handleToggleFocusStyles = () => setFocusStyles((prev) => !prev);

  const isComponentFocused = () => {
    const active = document.activeElement;
    const current = dropdown.current;
    return !!current?.contains(active);
  };

  const {
    focusedIndex,
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useDropdownKeyboardNavigation({
    container: dropdown,
    listLength: fixedOptions.length + filteredOptions.length,
    onKeyDown: (event: KeyboardEvent) => {
      // Handle keyboard events only if current element is focused
      if (!isComponentFocused()) return;

      switch (event.key) {
        // Close menu on ESC key
        case 'Escape':
          setIsMenuOpen(false);
          setFocusToToggleButton();
          break;
        case 'ArrowUp':
          ensureDropdownIsOpen();
          break;
        case 'ArrowDown':
          ensureDropdownIsOpen();
          break;
        case 'Enter':
          if (isToggleButtonFocused()) {
            handleToggleButtonClick();
          } else {
            setIsMenuOpen(false);
            setFocusToToggleButton();
          }
          event.preventDefault();
      }
    },
  });

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      const target = event.target;
      const current = dropdown.current;

      // Close menu when clicking outside of the component
      if (
        !(target instanceof Node && current?.contains(target)) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  const toggleOption = React.useCallback(
    (option: string) => {
      onChange(
        value.includes(option)
          ? value.filter((v) => v !== option)
          : [...value, option]
      );
    },
    [onChange, value]
  );

  const ensureDropdownIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const isToggleButtonFocused = () => {
    const active = document.activeElement;
    const current = toggleButton.current;

    return !!current?.contains(active);
  };

  const setFocusToToggleButton = () => {
    toggleButton.current?.focus();
  };

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = dropdown.current;

    if (!(target instanceof Node && current?.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('focusin', handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('focusin', handleDocumentFocusin);
    };
  }, [handleDocumentClick, setupKeyboardNav, teardownKeyboardNav]);

  const setFocusToInput = () => {
    inputRef.current?.focus();
  };

  const handleToggleButtonClick = () => {
    toggleMenu();

    setTimeout(() => {
      if (!isMenuOpen) {
        setFocusToInput();
      }
    }, 0);
  };

  const handleClear = React.useCallback(() => {
    onChange([]);
    handleInputValueChange('');
  }, [handleInputValueChange, onChange]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val === selectAll) {
      handleClear();
    } else {
      toggleOption(val);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputValueChange(event.target.value);
  };

  const selectedText = React.useMemo(() => {
    const valueLabels = value
      .map((val) => {
        if (renderOptionText) {
          return renderOptionText(val);
        } else {
          const result = options.find((option) => option.value === val);
          return result ? result.text : null;
        }
      })
      .filter(skipFalsyType)
      .sort(reactElementOrStringCompare);

    if (valueLabels.length > 1) {
      return (
        <>
          {valueLabels[0]} + {valueLabels.length - 1}
        </>
      );
    }
    return valueLabels[0];
  }, [options, renderOptionText, value]);

  React.useEffect(() => {
    if (!isMenuOpen) {
      handleInputValueChange('');
    }
  }, [handleInputValueChange, isMenuOpen]);

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const val = event.currentTarget.value;
    if (event.key === 'Enter') {
      if (val === selectAll) {
        handleClear();
      } else {
        toggleOption(val);
      }
    }
  };

  const createDropdownOptions = (option: Option, index: number) => {
    const isFocused = index === focusedIndex;
    const isChecked =
      option.value === selectAll ? !value.length : value.includes(option.value);

    const setFocus = (ref: HTMLInputElement) => {
      if (isFocused && ref) {
        ref.focus();
      }
    };

    return (
      <ScrollIntoViewWithFocus
        className={classNames(styles.dropdownItem, {
          [styles['dropdownItem--first']]: index === 0,
          [styles['dropdownItem--isFocused']]: isFocused,
        })}
        key={option.value}
        isFocused={isFocused}
      >
        <Checkbox
          ref={setFocus}
          checked={isChecked}
          id={`${checkboxName}_${option.value}`}
          label={option.text}
          name={checkboxName}
          onChange={handleValueChange}
          onKeyDown={handleEnterKeyPress}
          value={option.value}
        />
      </ScrollIntoViewWithFocus>
    );
  };

  return (
    <div className={classNames(styles.dropdown, className)} ref={dropdown}>
      <button
        type="button"
        aria-label={title}
        className={styles.toggleButton}
        onClick={handleToggleButtonClick}
        ref={toggleButton}
        onFocus={handleToggleFocusStyles}
        onBlur={handleToggleFocusStyles}
        style={buttonStyles}
      >
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.title}>
          <SearchLabel htmlFor={name} srOnly={true}>
            {title}
          </SearchLabel>
          {selectedText ? (
            <div className={styles.titleText}>{selectedText}</div>
          ) : (
            <div className={styles.placeholder}>{title}</div>
          )}
        </div>
        <div
          className={classNames(
            styles.arrowWrapper,
            focusStyles ? styles.focused : ''
          )}
        >
          {isMenuOpen ? <IconAngleUp /> : <IconAngleDown />}
        </div>
      </button>
      <DropdownMenu
        isOpen={isMenuOpen}
        // FIXME: accessibility issues are reported in clear-button. Now not rendered by default. See ticket HH-376.
        onClear={showClearButton ? handleClear : undefined}
      >
        {showSearch && (
          <div className={styles.inputWrapper}>
            <IconSearch size="s" aria-hidden />
            <SearchLabel htmlFor={name} srOnly={true}>
              {inputPlaceholderText}
            </SearchLabel>
            <input
              ref={inputRef}
              id={name}
              name={name}
              placeholder={inputPlaceholderText}
              onChange={handleInputChange}
              value={input}
              autoComplete="off"
            />
          </div>
        )}
        {helpText && <div className={styles.helpText}>{helpText}</div>}
        {filteredOptions.map(createDropdownOptions)}
        {fixedOptions.length > 0 && filteredOptions.length > 0 && (
          <hr className={styles.separator} />
        )}
        {fixedOptions.map((option, index) =>
          // the filtered optiosn are rendered first in the same dropdown,
          // so the index must be now started from the end of filtered options list
          createDropdownOptions(option, index + filteredOptions.length)
        )}
      </DropdownMenu>
    </div>
  );
};

export default MultiSelectDropdown;
