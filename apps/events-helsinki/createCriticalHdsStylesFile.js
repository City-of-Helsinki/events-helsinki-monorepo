const hdsReact = require('hds-react');
const fs = require('node:fs/promises');

const path = './src/styles/critical-hds-styles.css';

async function createCriticalHdsStylesFile() {
  try {
    const hdsCriticalRules = await hdsReact.getCriticalHdsRules(
      '<empty></empty>',
      hdsReact.hdsStyles
    );
    await fs.writeFile(path, hdsCriticalRules, { flag: 'w+' });
    // eslint-disable-next-line no-console
    console.info(
      `A file with critical HDS styles was created in the path '${path}'.`
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
createCriticalHdsStylesFile();
