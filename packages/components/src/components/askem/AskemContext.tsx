import { createContext } from 'react';
import type { AskemInstance } from './types';

const MatomoContext = createContext<AskemInstance | null>(null);

export default MatomoContext;
