import type { RnsData } from '../../types';
import type Askem from './Askem';

export type AskemBaseConfig = {
  disabled?: boolean;
  scriptUrl?: string;
  consentGiven?: boolean;
};

export type AskemConfigs = AskemBaseConfig & RnsData;

export interface AskemInstance {
  disabled: boolean;
  setRnsConfigValue: Askem['setRnsConfigValue'];
  consentGiven: boolean;
}
