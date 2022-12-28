import type { LandingPage, LandingPagesResponse } from '../types/types';
import DataSource from './CmsDataSource';

class LandingPageAPI extends DataSource {
  public async getLandingPage(
    id: string,
    query?: string
  ): Promise<LandingPage> {
    return this.get(`landing-pages/${id}${query}`);
  }
  public async getLandingPages(
    query: string
  ): Promise<LandingPagesResponse['data']> {
    return this.get(`landing-pages${query}`);
  }
}

export default LandingPageAPI;
