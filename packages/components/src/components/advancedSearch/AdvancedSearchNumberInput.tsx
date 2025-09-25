import type { NumberInputProps, TextInputProps } from 'hds-react';
import { IconSearch, NumberInput } from 'hds-react';
import React from 'react';
import AdvancedSearchInput from './AdvancedSearchInput';

export type AdvancedSearchNumberInputProps = NumberInputProps & {
  icon?: Parameters<typeof AdvancedSearchInput>[0]['IconComponent'];
} & Pick<TextInputProps, 'placeholder'>;

/**
 * AdvancedSearchNumberInput is a component that provides a search input field
 * with an icon—defaults to search icon if no other icon is specified.
 * It is a pre-configured version of the AdvancedSearchInput
 * component, using HDS TextInput and IconSearch.
 * @param props The props for the HDS NumberInput component and optional icon.
 * @returns The rendered component.
 */
export function AdvancedSearchNumberInput(
  props: AdvancedSearchNumberInputProps
): React.ReactElement {
  return (
    <AdvancedSearchInput
      IconComponent={props.icon ?? <IconSearch />}
      InputComponent={
        <NumberInput {...props} type="number" autoComplete="off" />
      }
    />
  );
}

export default AdvancedSearchNumberInput;
