import type { OrganizationDetails } from '../types/types';
import DataSource from './LinkedEventsDataSource';

class OrganizationAPI extends DataSource {
  public async getOrganizationDetails(
    id: string
  ): Promise<OrganizationDetails> {
    return this.get(`organization/${id}`);
  }
}

export default OrganizationAPI;
