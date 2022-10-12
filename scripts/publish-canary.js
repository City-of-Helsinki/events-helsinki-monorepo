/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const editJsonFile = require('edit-json-file');
const currentGitCommit = require('git-rev-sync');

const { execShellCommand } = require('./utils');
const process = require('process');
const path = require('path');

async function publishCanary() {
  const file = editJsonFile(path.join(process.cwd(), 'package.json'), {
    autosave: true,
  });
  const originalVersion = file.get('version');
  const canaryVersion = `${originalVersion}-canary-${currentGitCommit.short()}`;

  file.set('version', canaryVersion);

  try {
    const [stdout, stderr] = await execShellCommand(
      'npm publish --tag canary --color always --registry=https://registry.npmjs.org/ --access=public'
    );
    process.stdout.write(stdout);
    process.stderr.write(stderr);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  } finally {
    file.set('version', originalVersion);
  }
}

publishCanary();
