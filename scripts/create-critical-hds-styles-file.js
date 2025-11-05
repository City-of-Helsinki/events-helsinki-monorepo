import { getCriticalHdsRules, hdsStyles } from 'hds-react';
import fs from 'node:fs/promises';

const exampleFilePath = './static/assets/styles/critical-hds-styles.css';

async function createCriticalHdsStylesFile(filepath) {
  try {
    if (!filepath) {
      throw Error(
        `The CSS filepath (for example: ${exampleFilePath}) must be given as an argument!`
      );
    }
    const hdsCriticalRules = await getCriticalHdsRules(
      '<empty></empty>',
      hdsStyles
    );
    await fs.writeFile(filepath, hdsCriticalRules, { flag: 'w+' });
    // eslint-disable-next-line no-console
    console.info(
      `A file with critical HDS styles was created in the path '${filepath}'.`
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
createCriticalHdsStylesFile(process.argv[2] ?? '');
