import type { AskemConfigs } from './types';

class Askem {
  disabled = false;
  consentGiven = false;

  constructor(config: AskemConfigs) {
    this.initialize(config);
  }

  private initialize({
    apiKey,
    scriptUrl = 'https://cdn.reactandshare.com/plugin/rns.js',
    disabled = false,
    consentGiven,
  }: AskemConfigs) {
    this.disabled = disabled;
    this.consentGiven = Boolean(consentGiven);

    if (disabled || !apiKey || typeof window === 'undefined') {
      return;
    }

    window.rnsData = window.rnsData || {};
    window.rnsData.apiKey;
    if (!window.rnsData.apiKey) {
      window.rnsData.apiKey = apiKey;
    }

    const doc = document;
    const scriptElement = doc.createElement('script');
    const scripts = doc.getElementsByTagName('script')[0];

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
