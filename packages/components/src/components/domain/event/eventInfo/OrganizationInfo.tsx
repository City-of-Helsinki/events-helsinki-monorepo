import { IconCheckCircleFill, IconFaceSmile, IconLayers } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import InfoWithIcon from '../../../../components/infoWithIcon/InfoWithIcon';
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner';
import { useCommonTranslation } from '../../../../hooks';
import useLocale from '../../../../hooks/useLocale';
import { useAppRoutingContext } from '../../../../routingUrlProvider';
import type { EventFields } from '../../../../types/event-types';
import { useOrganizationDetailsQuery } from '../../../../types/generated/graphql';
import {
  getEventFields,
  isEventHelsinkiCityOwned,
} from '../../../../utils/eventUtils';
import { translateValue } from '../../../../utils/translateUtils';
import styles from './eventInfo.module.scss';

interface Props {
  event: EventFields;
}

const OrganizationInfo: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation('event');
  const { t: commonT } = useCommonTranslation();
  const { getOrganizationSearchUrl, getHelsinkiOnlySearchUrl } =
    useAppRoutingContext();
  const locale = useLocale();
  const router = useRouter();
  const { provider, publisher } = getEventFields(event, locale);
  const { data: organizationData, loading } = useOrganizationDetailsQuery({
    ssr: false,
    variables: { id: publisher },
  });
  const organizationName = organizationData?.organizationDetails.name;
  const isHelsinkiCityOwned = isEventHelsinkiCityOwned(event);

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
            {isHelsinkiCityOwned && (
              <div className={styles.helsinkiCityOwnedText}>
                {commonT('common:cityOfHelsinki')}
                <IconCheckCircleFill
                  className={styles.helsinkiCityOwnedIcon}
                  aria-hidden
                />
              </div>
            )}
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
            {isHelsinkiCityOwned && (
              <SecondaryLink
                data-testid="helsinkiOnlyLink"
                className={styles.link}
                variant="arrowRight"
                href={getHelsinkiOnlySearchUrl(event, router, locale)}
              >
                {translateValue(
                  'info.linkSearchByHelsinkiOnly.',
                  event.typeId as string,
                  t
                )}
              </SecondaryLink>
            )}
          </LoadingSpinner>
        </InfoWithIcon>
      )}
    </>
  );
};

export default OrganizationInfo;
