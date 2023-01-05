/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');
const flatten = require('flat');
const axios = require('axios');

const TRANSLATIONS_SOURCE = './locales';
const LANGUAGES = ['fi', 'sv', 'en'];
const DEFAULT_LANGUAGE = 'fi';
const TRANSLATIONS_DESTINATION =
  'https://harrastus.hkih.stage.geniem.io/graphql';
const TRANSLATION_MUTATION = `
mutation CreateTranslationMutation(input: $input) {
  createTranslation(
    input: $input
  ) {
    translation {
      title
      translations {
        key
        translations {
          en
          fi
          sv
        }
      }
    }
  }
}
`;

async function getLocalTranslations(locale) {
  let allTranslationsMerged = {};
  const localeDir = `${TRANSLATIONS_SOURCE}/${locale}`;
  const jsonsInDir = fs
    .readdirSync(localeDir)
    .filter((file) => path.extname(file) === '.json');

  jsonsInDir.forEach(async (file) => {
    const fileData = fs.readFileSync(path.join(localeDir, file));
    // Flatten the json to a single level object
    const json = JSON.parse(fileData.toString());
    allTranslationsMerged = {
      ...allTranslationsMerged,
      [path.parse(file).name]: { ...json },
    };
    console.info(`Merged ${json.length} translations from ${file.name}`);
  });

  return flatten(allTranslationsMerged);
}

async function saveTranslationDocumentToCMS(translation) {
  const [title, ...slug] = translation[0].split('.');
  const date = new Date().toISOString().split('T')[0];
  const input = {
    title,
    slug: slug.join('.'),
    date,
    status: 'PUBLISH',
  };
  return input;
  // const res = await axios.post(TRANSLATIONS_DESTINATION, {
  //   query: TRANSLATION_MUTATION,
  //   variable: { input },
  // });
  // const translationDocument = res.data.data.translation;

  // console.info(`translation ${translationDocument.translation.key} saved`);

  // return translationDocument;
}

async function loadTranslations() {
  try {
    const translations = await getLocalTranslations(DEFAULT_LANGUAGE);
    console.debug('loadTranslations', { translations });
    await Promise.all(
      Object.entries(translations).map((translation) =>
        saveTranslationDocumentToCMS(translation)
      )
    );

    console.info(
      `Saved translations for ${LANGUAGES.join(
        ', '
      )} into ${TRANSLATIONS_DESTINATION}`
    );
  } catch (e) {
    console.error(`Failed to export translations:
    ERROR: ${e}`);
  }
}

loadTranslations();
