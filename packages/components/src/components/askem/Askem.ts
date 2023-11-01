import type { RnsData } from '../../types';
import type { AskemConfigs } from './types';

class Askem {
  disabled = false;
  consentGiven = false;

  constructor(config: AskemConfigs) {
    this.initialize(config);
  }

  private initialize({
    // AskemBaseConfig properties
    disabled = false,
    scriptUrl = 'https://cdn.reactandshare.com/plugin/rns.js',
    consentGiven = false,
    // RnsData properties
    apiKey,
    title,
    canonicalUrl,
    author,
    date,
    categories,
    commentNumber,
    postId,
    ctaUrl,
    disableFa,
    disableFonts,
    initCallback,
    reactionCallback,
    shareCallback,
  }: AskemConfigs) {
    this.disabled = disabled;
    this.consentGiven = Boolean(consentGiven);

    if (disabled || !apiKey || typeof window === 'undefined') {
      return;
    }
    const rnsData: RnsData = {
      apiKey,
      title,
      canonicalUrl,
      author,
      date,
      categories,
      commentNumber,
      postId,
      ctaUrl,
      disableFa,
      disableFonts,
      initCallback,
      reactionCallback,
      shareCallback,
    };
    window.rnsData = rnsData;

    const scriptElement = document.createElement('script');
    const scripts = document.getElementsByTagName('script')[0];

    Object.assign(scriptElement, {
      type: 'text/javascript',
      async: true,
      defer: true,
      src: scriptUrl,
    });

    if (scripts && scripts.parentNode) {
      scripts.parentNode.insertBefore(scriptElement, scripts);
    }
  }

  setRnsConfigValue(
    propName: string,
    value: string | string[] | number
  ): Askem {
    if (typeof window !== 'undefined') {
      window.rnsData = {
        ...window.rnsData,
        [propName]: value,
      };
      window.resetRns();
    }

    return this;
  }
}

export default Askem;
