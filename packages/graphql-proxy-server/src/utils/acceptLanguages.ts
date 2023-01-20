import accepts from 'accepts';

/**
 * Get an accepted language from the request header.
 * @param req express.Request
 * @param languages a list of languages that the datasource supports
 * @returns a requested language or false
 */
function acceptsLanguages(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any,
  languages: string[]
): typeof languages[number] | false {
  const accept = accepts(req);

  return accept.languages(languages);
}

export default acceptsLanguages;
