import matchers from '@testing-library/jest-dom/matchers';
import { vi, expect } from 'vitest';

expect.extend(matchers);

const jestCompatOverride = {
  fn: vi.fn,
  spyOn: vi.spyOn,
};

(global as Record<'jest', unknown>).jest = jestCompatOverride;
