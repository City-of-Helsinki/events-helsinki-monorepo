import type { AboutPagesResponse } from '../types/types';
import DataSource from './CmsDataSource';

class AboutPageAPI extends DataSource {
  public async getAboutPages(): Promise<AboutPagesResponse['data']> {
    return this.get('static-pages/about');
  }
}

export default AboutPageAPI;
