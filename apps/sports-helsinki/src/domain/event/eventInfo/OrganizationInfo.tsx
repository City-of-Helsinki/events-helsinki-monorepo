import type { EventFieldsFragment } from 'events-helsinki-components';
import {
  EventTypeId,
  getEventFields,
  isEventTypeId,
  InfoWithIcon,
  LoadingSpinner,
  translateValue,
  useLocale,
  useOrganizationDetailsQuery,
} from 'events-helsinki-components';
import { IconFaceSmile, IconLayers } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import qs from 'query-string';
import React from 'react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import styles from './eventInfo.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const OrganizationInfo: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation('event');
  const locale = useLocale();
  const router = useRouter();
  const { provider, publisher } = getEventFields(event, locale);
  const { data: organizationData, loading } = useOrganizationDetailsQuery({
    ssr: false,
    variables: { id: publisher },
  });
  const searchParams = React.useMemo(
    () => new URLSearchParams(qs.stringify(router.query)),
    [router.query]
  );
  const returnPath = searchParams.get('returnPath') ?? '';
  const returnPathSearchParams = new URLSearchParams(returnPath);
  const returnPathSearchType = returnPathSearchParams.get('searchType') ?? '';
  const eventTypeId: EventTypeId = isEventTypeId(returnPathSearchType)
    ? returnPathSearchType
    : EventTypeId.General; // Fallback value
  const linkByPublisherLabel = React.useMemo(
    () => translateValue('info.linkSearchByPublisher.', eventTypeId, t),
    [eventTypeId, t]
  );
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
                  href={`${routerHelper.getLocalizedCmsItemUrl(
                    ROUTES.SEARCH,
                    { searchType: eventTypeId, publisher: publisher },
                    locale
                  )}`}
                >
                  {linkByPublisherLabel}
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
