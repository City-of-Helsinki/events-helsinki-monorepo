import type { SeasonRule } from './types';

export enum Season {
  Summer,
  Winter,
}

export const summerSeason: SeasonRule = {
  start: {
    day: 1,
    month: 5, // 1-based i.e. 5 = May
  },
  end: {
    day: 31,
    month: 10, // 1-based i.e. 10 = October
  },
};

export const winterSeason: SeasonRule = {
  start: {
    day: 1,
    month: 11, // 1-based i.e. 11 = November
  },
  end: {
    day: 30,
    month: 4, // 1-based i.e. 4 = April
  },
};
