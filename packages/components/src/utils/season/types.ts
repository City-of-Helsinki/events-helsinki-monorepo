export type SeasonRule = {
  start: {
    day: number;
    month: number; // 1-based i.e. 1 = January
  };
  end: {
    day: number;
    month: number; // 1-based i.e. 1 = January
  };
};
