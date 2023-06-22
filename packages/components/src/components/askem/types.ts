import type { RnsData } from '../../types';
import type Askem from './Askem';

export type AskemConfigs = {
  disabled?: boolean;
  scriptUrl?: string;
  consentGiven?: boolean;
} & RnsData;

export interface AskemInstance {
  disabled: boolean;
  setRnsConfigValue: Askem['setRnsConfigValue'];
  consentGiven: boolean;
}
