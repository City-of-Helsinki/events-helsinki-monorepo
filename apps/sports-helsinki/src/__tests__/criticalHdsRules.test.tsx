import * as fs from 'fs';
import * as path from 'path';
import * as hdsReact from 'hds-react';

const criticalHdsStylesFile = path.join(
  __dirname,
  '../../public/shared-assets/styles/',
  'critical-hds-styles.css'
);
const currentCriticalHdsStyles = fs.readFileSync(criticalHdsStylesFile, 'utf8');

describe('Critical HDS rules file generation', () => {
  it('critical-hds-styles are up to date', async () => {
    const minimumHdsCriticalRules = await hdsReact.getCriticalHdsRules(
      '<empty></empty>',
      (hdsReact as any).hdsStyles
    );
    expect(currentCriticalHdsStyles).toBe(minimumHdsCriticalRules);
  });
});
