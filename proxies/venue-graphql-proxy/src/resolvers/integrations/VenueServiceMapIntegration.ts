import AppConfig from '../../config/AppConfig';
import { Sources } from '../../contants/constants';
import type { TprekUnit, VenueDetails } from '../../types';
import {
  formAccessibilitySentences,
  formTranslationObject,
  getPointFromLongAndLat,
  getTprekId,
  translateVenue,
} from '../../utils/utils';
import type VenueEnricher from '../enrichers/VenueEnricher';
import type { VenueData } from './VenueResolverIntegration';
import VenueResolverIntegration from './VenueResolverIntegration';

type Config<I, O> = {
  enrichers: VenueEnricher<I, O>[];
};

const EMPTY_VENUE_DETAILS: VenueDetails = {
  id: '',
  dataSource: null,
  email: null,
  postalCode: '',
  image: null,
  addressLocality: null,
  position: null,
  description: null,
  name: null,
  infoUrl: null,
  streetAddress: null,
  telephone: null,
  ontologyTree: [],
  ontologyWords: [],
  accessibilitySentences: {},
  connections: [],
};

export default class VenueServiceMapIntegration extends VenueResolverIntegration<TprekUnit> {
  constructor(config: Config<TprekUnit, Partial<VenueData>>) {
    super({
      getDataSources: (id: string, _, { dataSources }) => [
        dataSources.serviceMap.getUnit(id),
      ],
      enrichers: config.enrichers,
      format: (data, context) =>
        translateVenue(
          this.formatter(data),
          context,
          AppConfig.isUseFallbackLocalesEnabled
        ),
    });
  }

  formatter(data: TprekUnit): Partial<VenueDetails> {
    if (data === null) {
      return EMPTY_VENUE_DETAILS;
    }
    return {
      id:
        getTprekId(data?.sources?.[0]?.source, data?.id?.toString()) ??
        undefined,
      dataSource: data?.sources?.[0]?.source ?? Sources.TPREK,
      email: data?.email ?? null,
      postalCode: data?.address_zip ?? undefined,
      image: data?.picture_url ?? null,
      position:
        data.longitude && data.latitude
          ? getPointFromLongAndLat(data.longitude, data.latitude)
          : null,
      description: formTranslationObject(data, 'desc'),
      name: formTranslationObject(data, 'name'),
      streetAddress: formTranslationObject(data, 'street_address'),
      addressLocality: formTranslationObject(data, 'address_city'),
      infoUrl: formTranslationObject(data, 'www'),
      accessibilitySentences: formAccessibilitySentences(data),
      telephone: {
        fi: data?.phone ?? undefined,
        sv: data?.phone ?? undefined,
        en: data?.phone ?? undefined,
      },
      connections:
        data?.connections?.map((connection) => ({
          sectionType: connection.section_type,
          name: formTranslationObject(connection, 'name') ?? {},
          phone: connection.phone,
          url: formTranslationObject(connection, 'www'),
        })) ?? undefined,
    };
  }
}
