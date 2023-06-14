import Askem from './Askem';
import type { AskemConfigs } from './types';

function createInstance(params: AskemConfigs): Askem {
  return new Askem(params);
}

export default createInstance;
