import type { OrganizationDetails } from '../types/types';
import LinkedEventsDataSource from './LinkedEventsDataSource';

class OrganizationDataSource extends LinkedEventsDataSource {
  public async getOrganizationDetails(
    id: string
  ): Promise<OrganizationDetails> {
    return this.get(`organization/${id}`);
  }
}

export default OrganizationDataSource;
