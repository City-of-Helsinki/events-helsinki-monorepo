import type { BreadcrumbListItem } from 'hds-react';
import { PageContentBreadcrumb } from 'react-helsinki-headless-cms';
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
