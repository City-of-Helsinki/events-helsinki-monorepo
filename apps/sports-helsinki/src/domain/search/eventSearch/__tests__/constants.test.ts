import { TARGET_GROUP_DATA } from '../constants';

describe('eventSearch constants', () => {
  describe('mappings of target groups to keywords', () => {
    for (const [targetGroup, { keywords }] of Object.entries(
      TARGET_GROUP_DATA
    )) {
      it(`${targetGroup} keyword list should not contain duplicates`, () => {
        expect([...new Set(keywords)].sort()).toStrictEqual(keywords.sort());
      });
    }
  });
});
