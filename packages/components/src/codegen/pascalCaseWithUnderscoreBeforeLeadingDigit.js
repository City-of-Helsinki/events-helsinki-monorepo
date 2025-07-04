import { pascalCase } from 'change-case-all';

function startsWithDigit(inputString) {
  return /^\d/.test(inputString);
}

/**
 * Transform input string to pascal case with underscore prefix
 * if there would be a leading digit.
 *
 * Added underscore prefix before a leading digit because of "yarn build-storybook" in
 * packages/components otherwise failing with an error:
 * "CodeGenerationError: Identifier directly after number" with e.g. key "1536X1536".
 */
function pascalCaseWithUnderscoreBeforeLeadingDigit(inputString) {
  const pascalCasedInput = pascalCase(inputString);
  const prefix = startsWithDigit(pascalCasedInput) ? '_' : '';
  return `${prefix}${pascalCasedInput}` || inputString;
}

export default pascalCaseWithUnderscoreBeforeLeadingDigit;
