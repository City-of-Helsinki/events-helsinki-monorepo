import { useContext } from 'react';

import configContext from '../configProvider/configContext';

/**
 * @deprecated After the monorepo rework and Apollo-Router changes,
 * the events configuration holder has not much use.
 */
export default function useConfig() {
  return useContext(configContext);
}
