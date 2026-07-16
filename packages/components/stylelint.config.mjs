/**
 * @type {import('stylelint').Config}
 * @link https://stylelint.io/user-guide/rules/list/
 */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': null,

    // Legacy SCSS patterns; fix incrementally rather than blanket-disabling standard-scss
    'declaration-property-value-keyword-no-deprecated': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'no-irregular-whitespace': null,
    'property-no-deprecated': null,
    'scss/dollar-variable-pattern': null,
  },
};
