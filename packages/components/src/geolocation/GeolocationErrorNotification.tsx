import type { NotificationProps } from 'hds-react';
import { Notification } from 'hds-react';
import { useTranslation } from 'next-i18next';
import { useGeolocation } from '../hooks';
import useCommonTranslation from '../hooks/useCommonTranslation';
import styles from './geolocation.module.scss';
import type { GeolocationContextType } from './types';

/**
 * Fix somehow broken HDS Notification opening animation
 * @see https://github.com/City-of-Helsinki/helsinki-design-system/blob/v2.15.0/packages
 * /react/src/components/notification/Notification.tsx#L134-L152
 *
 * Without overriding opacity and transform, the notification can open up and stay in
 * a transitional state where the notification is partly translucent and slightly
 * vertically moved.
 */
const FIX_BROKEN_OPENING_ANIMATION_STYLE = {
  opacity: 1,
  transform: 'translateY(0)',
};

export default function GeolocationErrorNotification(
  notificationProps: NotificationProps
) {
  const { t: commonTranslation } = useCommonTranslation();
  const { t } = useTranslation('geolocationProvider');
  const geolocation: GeolocationContextType = useGeolocation();

  return (
    <>
      {geolocation.error && (
        <Notification
          {...notificationProps}
          className={styles.geoNotification}
          onClose={geolocation.clearError}
          label={t('error.title')}
          type="alert"
          dismissible
          boxShadow
          size="default"
          position="top-right"
          style={FIX_BROKEN_OPENING_ANIMATION_STYLE}
          closeButtonLabelText={commonTranslation('button.close')}
        >
          {t(
            geolocation.error.PERMISSION_DENIED
              ? 'error.description.permissionDenied'
              : 'error.description.generic'
          )}
        </Notification>
      )}
    </>
  );
}
