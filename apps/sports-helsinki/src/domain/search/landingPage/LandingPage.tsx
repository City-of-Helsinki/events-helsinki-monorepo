import { HeroComponent } from '@events-helsinki/components';
import React from 'react';
import type {
  PageContentLayoutProps,
  PageType,
} from 'react-helsinki-headless-cms';
import { PageSection, ContentContainer } from 'react-helsinki-headless-cms';

import LandingPageSearch from '../landingPageSearch/LandingPageSearch';
import styles from './landingPage.module.scss';

export type PageProps = {
  page?: PageType;
};

export function LandingPageContentLayout({
  page,
  collections,
}: PageProps & PageContentLayoutProps) {
  const heroImage = page?.featuredImage?.node?.mediaItemUrl ?? '';
  const heroLinkTitle = page?.hero?.link?.title ?? '';
  const heroLinkUrl = page?.hero?.link?.url ?? '';
  const title = page?.hero?.title ?? '';
  const description = page?.hero?.description ?? '';

  const [firstCollection, ...restCollections] =
    (collections as React.ReactNode[]) ?? [];
  const lastCollection = restCollections.pop();

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.highlight}>
          {heroImage && (
            <PageSection
              className={styles.sectionHero}
              korosBottom
              korosBottomClassName={styles.korosBottomHero}
              backgroundImageUrl={heroImage}
            >
              <ContentContainer>
                {heroLinkTitle && heroLinkUrl && (
                  <HeroComponent
                    title={title ?? ''}
                    description={description ?? ''}
                    cta={{
                      label: heroLinkTitle ?? '',
                      href: heroLinkUrl ?? '',
                    }}
                  />
                )}
              </ContentContainer>
            </PageSection>
          )}
          <PageSection className={styles.sectionSearch}>
            <ContentContainer>
              <div className={styles.sectionSearchContent}>
                <LandingPageSearch />
              </div>
            </ContentContainer>
          </PageSection>
        </div>
        {firstCollection && (
          <PageSection
            korosTop
            korosTopClassName={styles.korosTopCollectionsFirst}
            className={styles.sectionCollectionsFirst}
          >
            <ContentContainer>{firstCollection}</ContentContainer>
          </PageSection>
        )}
        {restCollections && (
          <PageSection
            korosTop
            korosTopClassName={styles.korosTopCollectionsRest}
            className={styles.sectionCollections}
          >
            <ContentContainer>{restCollections}</ContentContainer>
          </PageSection>
        )}
        {lastCollection && (
          <PageSection
            korosTop
            korosBottom
            korosTopClassName={styles.korosTopCollectionsLast}
            korosBottomClassName={styles.korosBottomCollectionsLast}
            className={styles.sectionCollectionsLast}
          >
            <ContentContainer>{lastCollection}</ContentContainer>
          </PageSection>
        )}
      </div>
    </div>
  );
}
