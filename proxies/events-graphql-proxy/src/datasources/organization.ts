import type { OrganizationDetails } from '../types/types';
import LinkedEventsDataSource from './LinkedEventsDataSource';

class OrganizationAPI extends LinkedEventsDataSource {
  public async getOrganizationDetails(
    id: string
  ): Promise<OrganizationDetails> {
    return this.get(`organization/${id}`);
  }
}

export default OrganizationAPI;
