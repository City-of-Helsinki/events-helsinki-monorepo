import type { RnsData } from '../../types';
import type Askem from './Askem';

export type AskemConfigs = {
  disabled?: boolean;
  scriptUrl?: string;
} & RnsData;

export interface AskemInstance {
  setRnsConfigValue: Askem['setRnsConfigValue'];
}
