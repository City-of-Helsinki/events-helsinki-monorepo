import { Notification } from 'hds-react';
import { useTranslation } from 'next-i18next';
import useCommonTranslation from '../hooks/useCommonTranslation';
import type { GeolocationContextType } from './types';
import { useGeolocationContext } from './index';

export default function GeolocationErrorNotification() {
  const geolocation: GeolocationContextType = useGeolocationContext();
  const { t: commonTranslation } = useCommonTranslation();
  const { t } = useTranslation('geolocationProvider');

  return (
    <div style={{ position: 'absolute' }}>
      {geolocation.error && (
        <Notification
          label={t('error.title')}
          position="top-right"
          boxShadow
          dismissible
          autoClose
          autoCloseDuration={5000}
          displayAutoCloseProgress={true}
          closeButtonLabelText={commonTranslation('common:button.close')}
          // style={{ opacity: 1 }}
          type="alert"
          onClose={geolocation.clearError}
        >
          {t(
            geolocation.error.PERMISSION_DENIED
              ? 'error.description.permissionDenied'
              : 'error.description.generic'
          )}
        </Notification>
      )}
    </div>
  );
}
