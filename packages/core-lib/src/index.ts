export * from './apollo/utils';
export * from './constants';
export * from './types';
export * from './utils';

export const sayHello = (name: string): string => {
  return `I'm the @events-helsinki/ui-lib component telling ${name} !`;
};
