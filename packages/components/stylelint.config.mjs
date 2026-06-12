/**
 * @type {import('stylelint').Config}
 * @link https://stylelint.io/user-guide/rules/list/
 */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': null,

    // Baseline exceptions: existing SCSS predates stylelint-config-standard-scss
    'alpha-value-notation': null,
    'at-rule-empty-line-before': null,
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'comment-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-empty-line-before': null,
    'declaration-property-value-keyword-no-deprecated': null,
    'font-family-name-quotes': null,
    'length-zero-no-unit': null,
    'media-feature-range-notation': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'no-irregular-whitespace': null,
    'number-max-precision': null,
    'property-no-deprecated': null,
    'property-no-vendor-prefix': null,
    'rule-empty-line-before': null,
    'selector-id-pattern': null,
    'value-keyword-case': null,
    'value-no-vendor-prefix': null,

    'scss/at-extend-no-missing-placeholder': null,
    'scss/at-mixin-argumentless-call-parentheses': null,
    'scss/at-rule-conditional-no-parentheses': null,
    'scss/comment-no-empty': null,
    'scss/dollar-variable-colon-space-after': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/dollar-variable-pattern': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/double-slash-comment-whitespace-inside': null,
  },
};
