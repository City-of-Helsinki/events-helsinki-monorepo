import type { TextInputProps } from 'hds-react';
import { IconSearch, TextInput } from 'hds-react';
import React from 'react';
import AdvancedSearchInput from './AdvancedSearchInput';

export type AdvancedSearchTextInputProps = TextInputProps & {
  icon?: Parameters<typeof AdvancedSearchInput>[0]['IconComponent'];
};

/**
 * AdvancedSearchTextInput is a component that provides a search input field
 * with an icon—defaulting to a search icon if no other icon is specified.
 * It is a pre-configured version of the AdvancedSearchInput component, using
 * HDS TextInput and IconSearch.
 * @param props The props for the HDS TextInput component and optional icon.
 * @returns The rendered component.
 */
function AdvancedSearchTextInput(
  props: AdvancedSearchTextInputProps
): React.ReactElement {
  return (
    <AdvancedSearchInput
      IconComponent={props.icon ?? <IconSearch />}
      InputComponent={<TextInput {...props} type="text" autoComplete="off" />}
    />
  );
}

export default AdvancedSearchTextInput;
