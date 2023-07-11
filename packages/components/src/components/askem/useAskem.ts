import { useCallback, useContext } from 'react';
import AskemContext from './AskemContext';

const useAskem = () => {
  const instance = useContext(AskemContext);
  const setRnsConfigValue = useCallback(
    (propName: string, value: string | number | string[]) =>
      instance?.setRnsConfigValue(propName, value),
    [instance]
  );

  return {
    setRnsConfigValue,
    disabled: instance?.disabled,
    consentGiven: instance?.consentGiven,
  };
};

export default useAskem;
