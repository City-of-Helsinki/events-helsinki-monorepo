import type { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import { ConfigProvider, defaultConfig } from 'react-helsinki-headless-cms';
import CategoryFilter from './CategoryFilter';

export default {
  title: 'Example/CategoryFilter',
  component: CategoryFilter,
} as ComponentMeta<typeof CategoryFilter>;

const Template: ComponentStory<typeof CategoryFilter> = (args) => (
  <ConfigProvider config={defaultConfig}>
    <CategoryFilter {...args} />
  </ConfigProvider>
);

export const CategoryFilterDefault = Template.bind({});
CategoryFilterDefault.args = {
  text: 'Category filter text',
  href: window.location.href,
};
