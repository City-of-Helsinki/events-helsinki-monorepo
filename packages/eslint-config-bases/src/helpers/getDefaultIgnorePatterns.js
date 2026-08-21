const getDefaultIgnorePatterns = () => {
  return [
    // Hacky way to silence @yarnpkg/doctor about node_modules detection
    `**/${'node'}_modules`,
    '.cache',
    '**/.cache',
    '**/build',
    '**/dist',
    '**/.storybook',
    '**/storybook-static',
    '**/critical-hds-styles.css',
    // Next regenerates this with an import of .next/types that does not exist pre-build
    '**/next-env.d.ts',
  ];
};

export default getDefaultIgnorePatterns;
