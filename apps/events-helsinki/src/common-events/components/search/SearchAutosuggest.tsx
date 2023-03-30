import type {
  AutosuggestMenuOption,
  AutosuggestType,
} from '@events-helsinki/components';
import {
  AutoSuggestMenu,
  useLocale,
  useDebounce,
  useDropdownKeyboardNavigation,
  getLocalizedString,
  useKeywordListQuery,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { IconSearch } from 'hds-react';
import type { ChangeEvent } from 'react';
import React from 'react';

import { AUTOSUGGEST_KEYWORD_BLACK_LIST } from '../../../constants';
import styles from './searchAutosuggest.module.scss';

export interface SearchAutosuggestProps {
  name: string;
  onChangeSearchValue: (value: string) => void;
  onOptionClick: (item: AutosuggestMenuOption) => void;
  placeholder: string;
  searchValue: string;
}

const SearchAutosuggest: React.FC<SearchAutosuggestProps> = ({
  name,
  onOptionClick,
  onChangeSearchValue,
  placeholder,
  searchValue,
}) => {
  const locale = useLocale();
  const container = React.useRef<HTMLDivElement | null>(null);
  const input = React.useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const internalInputValue = useDebounce(searchValue, 300);
  const [isAutosugestFocused, setIsAutosugestFocused] = React.useState(false);

  const { data: keywordsData, loading: loadingKeywords } = useKeywordListQuery({
    skip: !internalInputValue,
    variables: {
      hasUpcomingEvents: true,
      pageSize: 5,
      text: internalInputValue,
    },
  });
  const [autoSuggestItems, setAutoSuggestItems] = React.useState<
    AutosuggestMenuOption[]
  >([]);

  const ensureMenuIsClosed = React.useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const {
    focusedIndex,
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useDropdownKeyboardNavigation({
    container: container,
    listLength: autoSuggestItems.length,
    onKeyDown: (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          ensureMenuIsOpen();
          break;
        case 'Escape':
          handleCloseMenu();
          break;
        case 'Enter':
          // eslint-disable-next-line no-case-declarations
          const selectedItem = autoSuggestItems[focusedIndex];

          if (selectedItem) {
            handleMenuOptionClick(selectedItem);
          } else {
            // Search by text if no option is selected
            handleMenuOptionClick({
              text: searchValue,
              type: 'text',
              value: searchValue,
            });
          }
          break;
        case 'Tab':
          ensureMenuIsClosed();
      }
    },
  });

  React.useEffect(() => {
    if (loadingKeywords) return;

    const items: AutosuggestMenuOption[] = [];
    const textItem = {
      text: internalInputValue,
      type: 'text' as AutosuggestType,
      value: internalInputValue,
    };

    items.push(textItem);

    items.push(
      ...(keywordsData?.keywordList?.data
        .filter((keyword) => {
          const name = getLocalizedString(keyword.name, locale).toLowerCase();
          return (
            !AUTOSUGGEST_KEYWORD_BLACK_LIST.includes(keyword.id || '') &&
            name &&
            name !== textItem.text.toLowerCase()
          );
        })
        .map((keyword) => ({
          text: getLocalizedString(keyword.name, locale),
          type: 'keyword' as AutosuggestType,
          value: keyword.id || '',
        })) || [])
    );

    setAutoSuggestItems(items.filter((item) => item.text));
  }, [internalInputValue, keywordsData, loadingKeywords, locale]);

  const handleCloseMenu = React.useCallback(() => {
    setFocusToInput();

    ensureMenuIsClosed();
  }, [ensureMenuIsClosed]);

  const handleMenuOptionClick = React.useCallback(
    (option: AutosuggestMenuOption) => {
      onOptionClick(option);
      handleCloseMenu();
    },
    [handleCloseMenu, onOptionClick]
  );

  const setFocusToInput = () => {
    input.current?.focus();
  };

  const handleComponentClick = () => {
    setFocusToInput();
  };

  const onDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const current = container.current;

      // Close menu when clicking outside of the component
      if (!(target instanceof Node && current?.contains(target))) {
        isMenuOpen && setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  const onDocumentFocusin = React.useCallback(
    (event: FocusEvent) => {
      const target = event.target;
      const current = container.current;

      if (!(target instanceof Node && current?.contains(target))) {
        ensureMenuIsClosed();
      }
    },
    [ensureMenuIsClosed]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    onChangeSearchValue(newValue);

    ensureMenuIsOpen();
  };

  const handleInputFocus = () => {
    ensureMenuIsOpen();
    setIsAutosugestFocused(true);
  };

  const handleInputBlur = () => {
    ensureMenuIsOpen();
    setIsAutosugestFocused(false);
  };

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('focusin', onDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('focusin', onDocumentFocusin);
    };
  }, [
    onDocumentClick,
    onDocumentFocusin,
    setupKeyboardNav,
    teardownKeyboardNav,
  ]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={handleComponentClick}
      className={classNames(
        styles.searchAutosuggest,
        isAutosugestFocused && styles.focused
      )}
      ref={container}
    >
      <div className={styles.iconWrapper}>
        <IconSearch size="s" aria-hidden />
      </div>
      <div className={styles.inputWrapper}>
        <input
          ref={input}
          id={name}
          name={name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          type="text"
          value={searchValue}
        />
      </div>
      <AutoSuggestMenu
        focusedOption={focusedIndex}
        isOpen={!!searchValue && isMenuOpen}
        onClose={handleCloseMenu}
        onOptionClick={handleMenuOptionClick}
        options={autoSuggestItems}
      />
    </div>
  );
};

export default SearchAutosuggest;
