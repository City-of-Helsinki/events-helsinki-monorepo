import {
  InfoWithIcon,
  LoadingSpinner,
  useLocale,
} from 'events-helsinki-components';
import { IconFaceSmile, IconLayers } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { SecondaryLink } from 'react-helsinki-headless-cms';

import { ROUTES } from '../../../constants';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';
import type { EventFieldsFragment } from '../../nextApi/graphql/generated/graphql';
import { useOrganizationDetailsQuery } from '../../nextApi/graphql/generated/graphql';
import { getEventFields } from '../EventUtils';
import styles from './eventInfo.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const OrganizationInfo: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation('event');
  const locale = useLocale();
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
                  className={styles.link}
                  variant="arrowRight"
                  href={`${getLocalizedCmsItemUrl(
                    ROUTES.SEARCH,
                    {},
                    locale
                  )}?publisher=${publisher}`}
                >
                  {t('info.linkSearchByPublisher')}
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
