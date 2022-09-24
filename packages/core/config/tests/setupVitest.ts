import matchers from '@testing-library/jest-dom/matchers';
import { vi, expect } from 'vitest';

expect.extend(matchers);

(global as Record<'jest', unknown>).jest = vi;
