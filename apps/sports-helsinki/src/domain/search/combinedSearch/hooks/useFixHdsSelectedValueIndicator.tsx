import React from 'react';

/**
 * The HDS-select has an issue with value indicator and the clearable-feature:
 * If the select-component value is set from external state and the form value is cleared,
 * the value indicator is not refreshed. The indicator tells that the value is still given,
 * when it's actualyl not.
 *
 * This hook fixes the issue by finding the clear-button and triggering it's onclick handler by clicking it.
 * @param selectComponentId the id-property value of the HDS select component.
 * @param value the current selected value (in state context).
 */
export default function useFixHdsSelectedValueIndicator({
  selectComponentId,
  value,
}: {
  selectComponentId: string;
  value: string | null | undefined;
}) {
  // Sync the value indicator when the select component value is cleared externally.
  React.useEffect(() => {
    // The select-component's most critical rendered element is the selector-button...
    const accessibilityShortcomingSelectorButton =
      window.document.getElementById(`${selectComponentId}-toggle-button`);
    // If a value is given and the clearable-feature is on,
    // there should be another button, that is a sibling element, to clear the value.
    const buttons =
      accessibilityShortcomingSelectorButton?.parentElement?.getElementsByTagName(
        'button'
      );
    const selectedValueIndicator =
      buttons?.length === 2 ? buttons[1] : undefined;

    // If the formValue is null or undefined, the indicator should not be visible.
    if (selectedValueIndicator && !value) {
      // Currently it seems like the only way to clear
      // the indicator is to trigger it's onclick-handler by clicking it.
      selectedValueIndicator.click();
    }
  }, [value, selectComponentId]);
}
