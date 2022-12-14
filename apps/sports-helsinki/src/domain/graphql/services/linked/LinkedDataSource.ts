import type { DataSourceConfig } from '@apollo/datasource-rest/dist/RESTDataSource';
import { dataSourceLinkedLogger } from '../../../../logger';
import type { Locale } from '../../../nextApi/types';
import RESTDataSource from '../../utils/RESTDataSource';

type LinkedObjectRef = {
  '@id': string;
};

type LinkedExternalLink = {
  name: string;
  link: string;
  language: string;
};

type LinkedTranslation = {
  fi?: string | null;
  sv?: string | null;
  en?: string | null;
} | null;

type LinkedOffer<Translation = LinkedTranslation> = {
  is_free: boolean;
  description: Translation;
  info_url: Translation;
  price: number;
};

type LinkedImage<Translation = LinkedTranslation> = {
  id: number;
  license: string;
  created_time: string;
  last_modified_time: string;
  name: Translation;
  url: string;
  cropping: string;
  photographer_name: string;
  alt_text: Translation;
  data_source: string;
  publisher: string;
  '@id': string;
  '@context': string;
  '@type': string;
};

type LinkedEvent<Translation = LinkedTranslation> = {
  id: string;
  location: LinkedObjectRef;
  keywords: LinkedObjectRef[];
  super_event: unknown | null;
  event_status: string;
  type_id: string;
  external_links: LinkedExternalLink[];
  offers: LinkedOffer<Translation>[];
  data_source: string;
  publisher: string;
  sub_events: string[];
  images: LinkedImage<Translation>[];
  videos: unknown[];
  in_language: LinkedObjectRef[];
  audience: unknown[];
  created_time: string;
  last_modified_time: string;
  date_published: null;
  start_time: string;
  end_time: string;
  custom_data: unknown | null;
  audience_min_age: unknown | null;
  audience_max_age: unknown | null;
  super_event_type: unknown | null;
  deleted: boolean;
  maximum_attendee_capacity: number | null;
  remaining_attendee_capacity: number | null;
  minimum_attendee_capacity: number | null;
  enrolment_start_time: string | null;
  enrolment_end_time: string | null;
  local: boolean;
  search_vector_fi: string;
  search_vector_en: string;
  search_vector_sv: string;
  replaced_by: string | null;
  description: Translation;
  info_url: Translation;
  short_description: Translation;
  name: Translation;
  location_extra_info: Translation;
  provider_contact_info: unknown | null;
  provider: Translation;
  '@id': string;
  '@context': string;
  '@type': string;
};

type LinkedPaginatedResponse<T> = {
  meta: {
    count: number;
    next?: string;
    previous?: string;
  };
  data: T[];
};

type LinkedEventQuery = {
  ids?: string[];
  start?: string;
  location?: string;
  sort?: string;
  superEventType?: string;
  language?: string;
  text?: string;
  translation?: string;
  page?: number;
  pageSize?: number;
  keywords?: string[];
};

/**
 * @deprecated The Event Graphql Proxy should be used instead.
 */
export default class Linked extends RESTDataSource {
  override baseURL = 'https://api.hel.fi/linkedevents/v1/';

  constructor(config: DataSourceConfig, logger = dataSourceLinkedLogger) {
    super(config);
    this.logger = logger;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  async getEvents(
    linkedEventQuery: LinkedEventQuery,
    language?: Locale
  ): Promise<LinkedPaginatedResponse<LinkedEvent>> {
    const params = new URLSearchParams();

    Object.entries(linkedEventQuery).forEach(([key, value]) => {
      // If value is falsy, don't include the query parameter
      if (!value) {
        return;
      }

      if (key === 'superEventType' && typeof value === 'string') {
        return params.set('super_event_type', value);
      }

      if (key === 'ids' && Array.isArray(value)) {
        return params.set('ids', value.join(','));
      }

      if (key === 'pageSize' && typeof value === 'number') {
        return params.set('page_size', value.toString());
      }

      if (key === 'keywords' && Array.isArray(value)) {
        return params.set('keyword', value.join(','));
      }

      if (typeof value === 'string') {
        params.set(key, value);
      }

      if (typeof value === 'number') {
        params.set(key, value.toString());
      }
    });

    if (language && !linkedEventQuery.language) {
      params.set('language', language);
    }

    if (language && !linkedEventQuery.translation) {
      params.set('translation', language);
    }

    return this.get(`event?${params.toString()}`);
  }

  async getPlace(id: string) {
    return this.get(`place/${id}/`);
  }
}
