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
  ];
};

export default getDefaultIgnorePatterns;
