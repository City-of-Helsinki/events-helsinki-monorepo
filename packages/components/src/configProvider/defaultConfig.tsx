import React from 'react';
import type { LinkProps } from 'react-helsinki-headless-cms';
import { Link } from 'react-helsinki-headless-cms';

import type { Config } from './types';

const defaultConfig: Config = {
  t: (translationKey: string) => translationKey,
  components: {
    A: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a {...props} />
    ),
    Link: (props: LinkProps) => <Link {...props} />,
  },
};

export default defaultConfig;
