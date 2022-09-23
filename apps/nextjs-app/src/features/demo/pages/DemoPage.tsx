import { Container, Text } from 'events-helsinki-components';
import { sayHello } from 'events-helsinki-core-old';
import { AsyncMessage, Message } from 'events-helsinki-ui-lib';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import type { FC } from 'react';
import { Banner } from '@/components/Banner';
import { DemoMuiBlock, Jumbotron, PoetryBlock } from '../blocks';
import { demoConfig } from '../demo.config';

export const DemoPage: FC = () => {
  const { t } = useTranslation(demoConfig.i18nNamespaces);

  return (
    <>
      <NextSeo
        title={t('demo:page.title')}
        description="Web-app nextjs monorepo example, https://github.com/belgattitude/nextjs-monorepo-example"
      />
      <Container>
        <Banner />
        <Text variant="h2">I'm the web-app</Text>
        <Jumbotron />
        <ul>
          <li>{`Foo says: ${sayHello(
            'World'
          )} from events-helsinki-core-old`}</li>
          <li>
            <Message
              message={'Bar react component from events-helsinki-ui-lib'}
            />
          </li>
          <li>
            <AsyncMessage apiUrl={'/api/hello'} />
          </li>
        </ul>
        <Image
          src={'/shared-assets/images/nextjs-logo.png'}
          alt={'logo'}
          width={400}
          height={240}
        />
        <div className={'pt-8'} />
        <DemoMuiBlock />
        <div className={'pt-8'} />
        <PoetryBlock />
      </Container>
    </>
  );
};
