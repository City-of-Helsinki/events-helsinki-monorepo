import {
  addParamsToQueryString,
  useLocale,
  getLargeEventCardId,
  useVenueTranslation,
} from 'events-helsinki-components';
import { IconArrowRight, IconLocation } from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BackgroundImage,
  LinkBox,
  TagComponent as Tag,
} from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';
import styles from './largeVenueCard.module.scss';

interface Props {
  id: string;
  title?: string;
  location?: string;
  imageUrl?: string;
  tags?: string[];
}

const LargeVenueCard: React.FC<Props> = ({
  id,
  title,
  location,
  tags,
  imageUrl,
}) => {
  const { t } = useVenueTranslation();
  const router = useRouter();
  const locale = useLocale();

  const queryString = addParamsToQueryString(
    router.asPath.split('?')[1] ?? '',
    {
      returnPath: `${getLocalizedCmsItemUrl(
        ROUTES.SEARCH,
        {},
        locale
      )}?venueId=${id}`,
    }
  );

  const venueUrl = `${getLocalizedCmsItemUrl(
    ROUTES.VENUES,
    { venueId: `tprek:${id}` },
    locale
  )}${queryString}`;

  return (
    <LinkBox
      type="linkBox"
      aria-label={t('venue:venueCard.ariaLabelLink', {
        name: title,
      })}
      id={getLargeEventCardId(id)}
      data-testid={id}
      href={venueUrl}
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

export default LargeVenueCard;
