import type { UrlObject } from 'url';
import classNames from 'classnames';
import { useAccordion, IconAngleDown, IconArrowRight } from 'hds-react';
import React from 'react';
import type { SecondaryLink } from 'react-helsinki-headless-cms';
import { Link } from 'react-helsinki-headless-cms';
import EllipsedTextWithToggle from '../ellipsedTextWithToggle/EllipsedTextWithToggle';
import Text from '../text/Text';
import styles from './infoBlock.module.scss';

type InfoBlockContentLinkProps = {
  label: string;
  href: string | UrlObject;
  iconRight?: JSX.Element | null;
  Component?: typeof Link | typeof SecondaryLink;
};

type InfoBlockContentListProps = {
  items: Array<string | React.ReactElement<InfoBlockContentLinkProps>>;
  inline?: boolean;
  className?: string;
};

type InfoBlockCollapseProps = {
  icon: React.ReactElement;
  items: Array<string | React.ReactElement>;
  className?: string;
  title: string;
  titleClassName?: string;
};

type InfoBlockExpandProps = {
  lines: string[];
  className?: string;
  initialVisibleLinesCount?: number;
};

type InfoBlockContent =
  | React.ReactElement<InfoBlockContentLinkProps>
  | React.ReactElement<InfoBlockContentListProps>
  | React.ReactElement<InfoBlockCollapseProps>
  | React.ReactElement<InfoBlockExpandProps>
  | string;

function getKey(item: InfoBlockContent): string {
  if (typeof item === 'string') {
    return item;
  }

  return item?.key?.toString() ?? Math.random().toString();
}

function getHrefAsString(href: string | UrlObject): string {
  if (typeof href === 'string') {
    return href;
  }

  return `${href.protocol}//${href.pathname}${
    href.search ? `?${href.search}` : ''
  }`;
}

function InfoBlockLink({
  label,
  href,
  iconRight = <IconArrowRight />,
  Component = Link,
}: InfoBlockContentLinkProps) {
  return (
    <Component
      className={styles.link}
      iconRight={iconRight}
      href={getHrefAsString(href)}
      aria-label={label}
    >
      <span>{label}</span>
    </Component>
  );
}

function InfoBlockList({
  items,
  inline,
  className,
}: InfoBlockContentListProps) {
  const nonEmptyItems = items.filter((item) => item);

  if (nonEmptyItems.length === 0) {
    return null;
  }

  return (
    <ul
      className={classNames(
        styles.list,
        {
          [styles.inline]: inline,
        },
        className
      )}
    >
      {nonEmptyItems.map((item) => (
        <li key={getKey(item)}>{item}</li>
      ))}
    </ul>
  );
}

function InfoBlockCollapse({
  items,
  icon,
  className,
  title,
  titleClassName,
}: InfoBlockCollapseProps) {
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const nonEmptyItems = items.filter((item) => item);

  if (nonEmptyItems.length === 0) {
    return null;
  }

  return (
    <div
      className={[styles.collapse, className, isOpen ? styles.isOpen : ''].join(
        ' '
      )}
    >
      <button
        {...buttonProps}
        aria-expanded={isOpen}
        className={titleClassName}
      >
        {title} {icon}
      </button>

      <div aria-hidden={!isOpen} {...contentProps}>
        {items}
      </div>
    </div>
  );
}

function InfoBlockExpandButton({
  children,
  className,
  ...delegated
}: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      {...delegated}
      type="button"
      className={classNames(styles.button, className)}
    >
      <span>{children}</span> <IconAngleDown aria-hidden="true" />
    </button>
  );
}

function InfoBlockExpand({
  lines,
  className,
  initialVisibleLinesCount,
}: InfoBlockExpandProps) {
  return (
    <EllipsedTextWithToggle
      className={className}
      lines={lines}
      button={InfoBlockExpandButton}
      initialVisibleLinesCount={initialVisibleLinesCount}
    />
  );
}

type Props = {
  icon: React.ReactElement;
  name: string;
  contents: InfoBlockContent[];
  target?: 'body' | 'card';
  headingLevel?: 'h2' | 'h3' | 'h4';
};

function InfoBlock({
  icon,
  name,
  contents,
  target = 'body',
  headingLevel = 'h4',
}: Props) {
  const contentWithoutEmpty = contents.filter((item) => {
    if (typeof item === 'string') {
      return Boolean(item);
    }

    const props = item?.props;
    const items = 'items' in props ? props?.items : null;

    if (items) {
      const allItemsAreEmpty = items.reduce(
        (acc, item) => acc && item === null,
        true
      );

      return !allItemsAreEmpty;
    }

    return true;
  });

  if (contentWithoutEmpty.length === 0) {
    return null;
  }

  const textVariant = target === 'card' ? 'body' : 'h5';

  return (
    <div className={classNames(styles.infoBlock, styles[target])}>
      <Text as={headingLevel} variant={textVariant} className={styles.name}>
        {icon} {name}
      </Text>
      <ul className={styles.content}>
        {contents.map((content) => (
          <li key={getKey(content)}>{content}</li>
        ))}
      </ul>
    </div>
  );
}

InfoBlock.Link = InfoBlockLink;
InfoBlock.List = InfoBlockList;
InfoBlock.Collapse = InfoBlockCollapse;
InfoBlock.Expand = InfoBlockExpand;

export default InfoBlock;
