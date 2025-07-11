/**
 * Opinionated config base for projects using storybook.
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */
import storybook from 'eslint-plugin-storybook';

// const storybookPatterns = {
//   files: ['**/*.stories.{ts,tsx,mdx}'],
// };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default [...storybook.configs['flat/recommended']];
