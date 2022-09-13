import isClient from './isClient';

const scrollToTop = (): void => {
  if (isClient) {
    window.scrollTo(0, 0);
  }
};

export default scrollToTop;
