import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useRouter } from 'next/router';

import TopProgressBar from './TopProgressBar';

export default {
  title: 'Example/TopProgressBar',
  component: TopProgressBar,
} as ComponentMeta<typeof TopProgressBar>;

const Template: ComponentStory<typeof TopProgressBar> = (args) => {
  const router = useRouter();
  const onClick = () => router.reload();
  return (
    <div id="container">
      <button onClick={onClick}>Reload</button>
      {'<--TopProgressBar under this-->'}
      <br />
      <TopProgressBar {...args} />
      {'<--TopProgressBar over this-->'}
    </div>
  );
};

export const TopProgressBarDefault = Template.bind({});
TopProgressBarDefault.args = {
  debug(message?, ...optionalParameters) {
    // eslint-disable-next-line no-console
    console.debug(message, optionalParameters);
  },
  error(message?, ...optionalParameters) {
    // eslint-disable-next-line no-console
    console.error(message, optionalParameters);
  },
  info(message?, ...optionalParameters) {
    // eslint-disable-next-line no-console
    console.info(message, optionalParameters);
  },
  warn(message?, ...optionalParameters) {
    // eslint-disable-next-line no-console
    console.warn(message, optionalParameters);
  },
};
