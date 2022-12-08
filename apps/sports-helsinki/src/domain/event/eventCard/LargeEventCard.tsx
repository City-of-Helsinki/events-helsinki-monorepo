import {
  addParamsToQueryString,
  useLocale,
  getLargeEventCardId,
} from 'events-helsinki-components';
import { IconArrowRight, IconLocation } from 'hds-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BackgroundImage,
  LinkBox,
  TagComponent as Tag,
} from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';
import styles from './largeEventCard.module.scss';

interface Props {
  id: string;
  title?: string;
  location?: string;
  imageUrl?: string;
  tags?: string[];
}

const LargeEventCard: React.FC<Props> = ({
  id,
  title,
  location,
  tags,
  imageUrl,
}) => {
  const { t } = useTranslation('event');
  const router = useRouter();
  const locale = useLocale();

  const queryString = addParamsToQueryString(
    router.asPath.split('?')[1] ?? '',
    {
      returnPath: `${getLocalizedCmsItemUrl(
        ROUTES.COURSESEARCH,
        {},
        locale
      )}?eventId=${id}`,
    }
  );

  const eventUrl = `${getLocalizedCmsItemUrl(
    ROUTES.VENUES,
    { venueId: `tprek:${id}` },
    locale
  )}${queryString}`;

  return (
    <LinkBox
      type="linkBox"
      aria-label={t('eventCard.ariaLabelLink', {
        title,
      })}
      id={getLargeEventCardId(id)}
      data-testid={id}
      href={eventUrl}
    >
      <div className={styles.eventCard}>
        <div className={styles.infoWrapper}>
          <div className={styles.eventName}>{title}</div>
          <div className={styles.eventLocation}>
            <IconLocation aria-hidden />
            {location}
          </div>
          <div className={styles.keywordWrapperDesktop}>
            {tags && tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
          <div className={styles.buttonWrapper}>
            <IconArrowRight
              className={styles.arrowRight}
              size="l"
              aria-hidden="true"
            />
          </div>
        </div>
        <BackgroundImage
          className={styles.imageWrapper}
          id={id}
          url={imageUrl || ''}
        ></BackgroundImage>
      </div>
    </LinkBox>
  );
};

export default LargeEventCard;
