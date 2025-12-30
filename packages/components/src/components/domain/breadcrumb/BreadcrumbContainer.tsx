import { PageContentBreadcrumb } from '@city-of-helsinki/react-helsinki-headless-cms';
import type { BreadcrumbListItem } from 'hds-react';
import styles from './breadcrumb.module.scss';

type BreadcrumbContainerProps = {
  breadcrumbs: BreadcrumbListItem[];
};

export function BreadcrumbContainer({ breadcrumbs }: BreadcrumbContainerProps) {
  return (
    <div className={styles.breadcrumbs}>
      <PageContentBreadcrumb breadcrumbs={breadcrumbs} />
    </div>
  );
}
