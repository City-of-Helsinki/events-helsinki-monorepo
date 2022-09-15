import React from 'react';
import { Config } from './types'

const configContext = React.createContext<Config>({} as Config);

export default configContext;
