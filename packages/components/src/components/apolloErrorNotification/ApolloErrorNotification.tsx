import type { NotificationProps } from 'hds-react';
import { Notification } from 'hds-react';
import { Trans } from 'next-i18next';
import { useResilientTranslation } from '../../hooks';
import useCommonTranslation from '../../hooks/useCommonTranslation';
import useErrorsTranslation from '../../hooks/useErrorsTranslation';

export type ApolloErrorNotificationProps = NotificationProps & {
  onClose: () => void;
};

export default function ApolloErrorNotification({
  onClose,
  ...hdsProps
}: ApolloErrorNotificationProps) {
  const { t } = useErrorsTranslation();
  const { t: commonTranslation } = useCommonTranslation();
  const { resilientT } = useResilientTranslation();
  const feedbackUrl = resilientT('errors:feedbackFormLink');

  return (
    <Notification
      {...hdsProps}
      onClose={onClose}
      label={t('apolloError.title')}
      type="error"
      dismissible
      size="default"
      position="bottom-right"
      closeButtonLabelText={commonTranslation('button.close')}
    >
      <Trans t={t} i18nKey="errors:apolloError.description">
        Osa sivuston toiminnoista ei ole käytettävissä. Koita myöhemmin
        uudestaan. Jos ongelma toistuu, kerro siitä meille{' '}
        <a href={feedbackUrl} target="_blank" rel="noopener noreferrer">
          palautelomakkeella
        </a>
      </Trans>
    </Notification>
  );
}
