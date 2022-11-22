import { ConsentModal } from '../../../../packages/common-tests/browser-tests';
import { initI18n as i18n } from '../../config/jest/initI18n';

class HobbiesConsentModal extends ConsentModal {
  protected get appName() {
    return i18n.t('appSports:appName');
  }
}

export default HobbiesConsentModal;
