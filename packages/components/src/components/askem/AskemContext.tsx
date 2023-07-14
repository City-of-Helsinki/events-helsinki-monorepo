import { createContext } from 'react';
import type { AskemInstance } from './types';

const AskemContext = createContext<AskemInstance | null>(null);

export default AskemContext;
