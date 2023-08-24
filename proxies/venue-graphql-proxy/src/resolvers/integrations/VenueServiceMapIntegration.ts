import AppConfig from '../../config/AppConfig';
import { Sources } from '../../contants/constants';
import type { TprekUnit, TranslatableVenueDetails } from '../../types';
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

const EMPTY_VENUE_DETAILS: TranslatableVenueDetails = {
  id: '',
  organizationId: null,
  departmentId: null,
  providerType: null,
  dataSource: null,
  email: null,
  postalCode: null,
  image: null,
  addressLocality: null,
  addressPostalFull: null,
  position: null,
  description: null,
  shortDescription: null,
  displayedServiceOwner: null,
  displayedServiceOwnerType: null,
  name: null,
  infoUrl: null,
  streetAddress: null,
  telephone: null,
  ontologyTree: [],
  ontologyWords: [],
  accessibilitySentences: { fi: [], en: [], sv: [] },
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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  formatter(data: TprekUnit): Omit<
    TranslatableVenueDetails,
    // These fields should be filled by the enrichments later:
    'ontologyTree' | 'ontologyWords'
  > {
    if (data === null) {
      return EMPTY_VENUE_DETAILS;
    }
    return {
      id: getTprekId(data?.sources?.[0]?.source, data?.id?.toString()) ?? '',
      organizationId: data?.org_id ?? null,
      departmentId: data?.dept_id ?? null,
      providerType: data?.provider_type ?? null,
      dataSource: data?.sources?.[0]?.source ?? Sources.TPREK,
      email: data?.email ?? null,
      postalCode: data?.address_zip ?? null,
      image: data?.picture_url ?? null,
      position:
        data.longitude && data.latitude
          ? getPointFromLongAndLat(data.longitude, data.latitude)
          : null,
      description: formTranslationObject(data, 'desc'),
      shortDescription: formTranslationObject(data, 'short_desc'),
      displayedServiceOwner: formTranslationObject(
        data,
        'displayed_service_owner'
      ),
      displayedServiceOwnerType: data?.displayed_service_owner_type ?? null,
      name: formTranslationObject(data, 'name'),
      streetAddress: formTranslationObject(data, 'street_address'),
      addressLocality: formTranslationObject(data, 'address_city'),
      addressPostalFull: formTranslationObject(data, 'address_postal_full'),
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
