import { IconFaceSmile, IconLayers } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import InfoWithIcon from '../../../../components/infoWithIcon/InfoWithIcon';
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner';
import useLocale from '../../../../hooks/useLocale';
import type { EventFields } from '../../../../types/event-types';
import { useOrganizationDetailsQuery } from '../../../../types/generated/graphql';
import type { GetOrganizationSearchUrlType } from '../../../../types/types';
import { getEventFields } from '../../../../utils/eventUtils';
import { translateValue } from '../../../../utils/translateUtils';
import styles from './eventInfo.module.scss';

interface Props {
  event: EventFields;
  getOrganizationSearchUrl: GetOrganizationSearchUrlType;
}

const OrganizationInfo: React.FC<Props> = ({
  event,
  getOrganizationSearchUrl,
}) => {
  const { t } = useTranslation('event');
  const locale = useLocale();
  const router = useRouter();
  const { provider, publisher } = getEventFields(event, locale);
  const { data: organizationData, loading } = useOrganizationDetailsQuery({
    ssr: false,
    variables: { id: publisher },
  });
  const organizationName = organizationData?.organizationDetails.name;

  return (
    <>
      {provider && (
        <InfoWithIcon icon={<IconFaceSmile />} title={t('info.labelOrganizer')}>
          <div>{provider}</div>
        </InfoWithIcon>
      )}
      {publisher && (
        <InfoWithIcon icon={<IconLayers />} title={t('info.labelPublisher')}>
          <LoadingSpinner hasPadding={false} isLoading={loading}>
            {organizationName && (
              <>
                <div>{organizationName}</div>
                <SecondaryLink
                  data-testid="publisherLink"
                  className={styles.link}
                  variant="arrowRight"
                  href={getOrganizationSearchUrl(event, router, locale)}
                >
                  {translateValue(
                    'info.linkSearchByPublisher.',
                    event.typeId as string,
                    t
                  )}
                </SecondaryLink>
              </>
            )}
          </LoadingSpinner>
        </InfoWithIcon>
      )}
    </>
  );
};

export default OrganizationInfo;
