import type { OrganizationDetails } from '../types/types.js';
import LinkedEventsDataSource from './LinkedEventsDataSource.js';

class OrganizationDataSource extends LinkedEventsDataSource {
  public async getOrganizationDetails(
    id: string
  ): Promise<OrganizationDetails> {
    return this.get(`organization/${id}`);
  }
}

export default OrganizationDataSource;
