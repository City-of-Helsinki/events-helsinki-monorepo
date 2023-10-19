import { AccessibilityProfile } from '../../types';

export function isAccessibilityProfile(
  value: unknown
): value is AccessibilityProfile {
  return Object.values<AccessibilityProfile>(AccessibilityProfile).includes(
    value as AccessibilityProfile
  );
}
