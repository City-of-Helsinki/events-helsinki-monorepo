import type { TextInputProps } from 'hds-react';
import { IconSearch, TextInput } from 'hds-react';
import React from 'react';
import AdvancedSearchInput from './AdvancedSearchInput';

/**
 * AdvancedSearchTextInput is a component that provides a search input field
 * with a search icon. It is a pre-configured version of the AdvancedSearchInput
 * component, using HDS TextInput and IconSearch.
 * @param props The props for the HDS TextInput component.
 * @returns The rendered component.
 */
function AdvancedSearchTextInput(props: TextInputProps): React.ReactElement {
  return (
    <AdvancedSearchInput
      IconComponent={<IconSearch />}
      InputComponent={<TextInput {...props} type="text" autoComplete="off" />}
    />
  );
}

export default AdvancedSearchTextInput;
