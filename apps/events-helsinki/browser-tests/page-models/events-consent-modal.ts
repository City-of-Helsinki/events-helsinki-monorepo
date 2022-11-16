import { ConsentModal } from '../../../../packages/common-tests/browser-tests';
import { initI18n as i18n } from '../../config/jest/initI18n';

class EventsConsentModal extends ConsentModal {
  protected get appName() {
    return i18n.t('eventsCommon:appName');
  }
}

export default EventsConsentModal;
