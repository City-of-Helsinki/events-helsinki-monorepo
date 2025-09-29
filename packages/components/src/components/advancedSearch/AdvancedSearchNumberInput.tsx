import { IconSearch, NumberInput, type TextInputProps } from 'hds-react';
import React from 'react';
import AdvancedSearchInput from './AdvancedSearchInput';

// Different from NumberInputProps type in hds-react as NumberInput
// itself picks only some of its props:
type UsedNumberInputProps = Parameters<typeof NumberInput>[0];

export type AdvancedSearchNumberInputProps = UsedNumberInputProps & {
  icon?: Parameters<typeof AdvancedSearchInput>[0]['IconComponent'];
} & Pick<TextInputProps, 'placeholder'>;

/**
 * AdvancedSearchNumberInput is a component that provides a search input field
 * with an icon—defaulting to a search icon if no other icon is specified.
 * It is a pre-configured version of the AdvancedSearchInput
 * component, using HDS NumberInput and IconSearch.
 * @param props The props for the HDS NumberInput component and optional
 * icon and placeholder.
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
