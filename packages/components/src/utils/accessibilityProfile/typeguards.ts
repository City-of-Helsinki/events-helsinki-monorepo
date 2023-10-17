import { AccessibilityProfile } from '../../types';

export function isAccessibilityProfile(
  value: string
): value is AccessibilityProfile {
  return Object.values<string>(AccessibilityProfile).includes(value);
}
