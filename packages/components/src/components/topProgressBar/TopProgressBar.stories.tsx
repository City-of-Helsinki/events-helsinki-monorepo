import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useRouter } from 'next/router';
import React from 'react';
import { ConfigProvider, defaultConfig } from '../../configProvider';

import TopProgressBar from './TopProgressBar';

export default {
  title: 'Example/TopProgressBar',
  component: TopProgressBar,
} as ComponentMeta<typeof TopProgressBar>;

const Template: ComponentStory<typeof TopProgressBar> = (args) => {
  const router = useRouter();
  const onClick = () => router.reload();
  return (
    <ConfigProvider
      config={{
        ...defaultConfig,
        apolloClient: new ApolloClient({ cache: new InMemoryCache() }),
        router: router,
      }}
    >
      <div id="container">
        <button onClick={onClick}>Reload</button>
        {'<--TopProgressBar under this-->'}
        <br />
        <TopProgressBar {...args} />
        {'<--TopProgressBar over this-->'}
      </div>
    </ConfigProvider>
  );
};

export const TopProgressBarDefault = Template.bind({
  debug: (text: string) =>
    document.getElementById('container')?.append('debug: ' + text),
  error: (text: string) =>
    document.getElementById('container')?.append('error: ' + text),
});
