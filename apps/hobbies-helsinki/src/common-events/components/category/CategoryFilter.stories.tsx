// import type { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import { ConfigProvider, defaultConfig } from 'react-helsinki-headless-cms';
import CategoryFilter from './CategoryFilter';

// eslint-disable-next-line no-console
console.info('TODO: upgrade and configure storybook');

export default {
  title: 'Example/CategoryFilter',
  component: CategoryFilter,
}; // as ComponentMeta<typeof CategoryFilter>;

// const Template: ComponentStory<typeof CategoryFilter> = (args) => (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any) => (
  <ConfigProvider config={defaultConfig}>
    <CategoryFilter {...args} />
  </ConfigProvider>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CategoryFilterDefault: any = Template.bind({});
CategoryFilterDefault.args = {
  text: 'Category filter text',
  href: window.location.href,
};
