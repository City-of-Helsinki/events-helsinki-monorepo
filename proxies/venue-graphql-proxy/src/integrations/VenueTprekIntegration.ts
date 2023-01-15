import { Sources } from '../contants/constants';
import type VenueEnricher from '../enrichers/VenueEnricher';
import type { TprekUnit, VenueDetails } from '../types';
import {
  formAccessibilitySentences,
  formTranslationObject,
  getPointFromLongAndLat,
  getTprekId,
  translateVenue,
} from '../utils/utils';
import type { VenueData } from './VenueResolverIntegration';
import VenueResolverIntegration from './VenueResolverIntegration';

type Config<I, O> = {
  enrichers: VenueEnricher<I, O>[];
};

export default class VenueTprekIntegration extends VenueResolverIntegration<TprekUnit> {
  constructor(config: Config<TprekUnit, Partial<VenueData>>) {
    super({
      getDataSources: (id: string, _, { dataSources }) => [
        dataSources.tprek.getUnit(id),
      ],
      enrichers: config.enrichers,
      format: (data, context) => translateVenue(this.formatter(data), context),
    });
  }

  formatter(data: TprekUnit): Partial<VenueDetails> {
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
