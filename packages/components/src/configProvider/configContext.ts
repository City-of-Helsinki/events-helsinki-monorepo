import React from 'react';
import type { Config } from './types';

const configContext = React.createContext<Config>({} as Config);

/**
 * @deprecated After the monorepo rework and Apollo-Router changes,
 * the events configuration holder has not much use.
 */
export default configContext;
