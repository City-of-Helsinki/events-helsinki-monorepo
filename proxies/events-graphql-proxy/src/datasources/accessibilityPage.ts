import type { AccessibilityPagesResponse } from '../types/types';
import DataSource from './CmsDataSource';

class AccessibilityPageAPI extends DataSource {
  public async getAccessibilityPages(): Promise<
    AccessibilityPagesResponse['data']
  > {
    return this.get('static-pages/accessibility');
  }
}

export default AccessibilityPageAPI;
