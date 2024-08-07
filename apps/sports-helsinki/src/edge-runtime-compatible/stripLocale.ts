export const stripLocale = (path: string) =>
  path.replace(/^\/(?:en|sv|fi)(?:\/|$)/i, `/`);
