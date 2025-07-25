import AppConfig from '../../config/AppConfig.js';
import { Sources } from '../../contants/constants.js';
import type {
  TprekUnit,
  TprekUnitWithoutNull,
  TranslatableVenueDetails,
  TranslatedVenueDetails,
} from '../../types.js';
import type { TranslatableFieldsFor } from '../../utils/utils.js';
import {
  formAccessibilitySentences,
  formTranslationObject,
  getPointFromLongAndLat,
  getTprekId,
  translateUnenrichedVenue,
} from '../../utils/utils.js';
import type VenueEnricher from '../enrichers/VenueEnricher.js';
import VenueResolverIntegration from './VenueResolverIntegration.js';

type Config<I, O> = {
  enrichers: VenueEnricher<I, O>[];
};

export type UnenrichedUnitFields =
  | 'id'
  | 'organizationId'
  | 'departmentId'
  | 'providerType'
  | 'dataSource'
  | 'email'
  | 'postalCode'
  | 'image'
  | 'position'
  | 'description'
  | 'shortDescription'
  | 'displayedServiceOwner'
  | 'displayedServiceOwnerType'
  | 'name'
  | 'streetAddress'
  | 'addressLocality'
  | 'addressPostalFull'
  | 'infoUrl'
  | 'accessibilitySentences'
  | 'telephone'
  | 'connections';

export default class VenueServiceMapIntegration extends VenueResolverIntegration<
  TprekUnit,
  Pick<TranslatedVenueDetails, UnenrichedUnitFields>
> {
  constructor(config: Config<TprekUnit, Partial<TranslatedVenueDetails>>) {
    super({
      getDataSource: (id: string, _, { dataSources }) =>
        dataSources.serviceMap.getUnit(id),
      enrichers: config.enrichers,
      format: (data, context) =>
        translateUnenrichedVenue(
          this.makeUnenrichedTranslatableVenueDetails(data),
          context,
          AppConfig.isUseFallbackLocalesEnabled
        ),
    });
  }

  makeUnenrichedTranslatableVenueDetails(
    data: TprekUnit
  ): Pick<TranslatableVenueDetails, UnenrichedUnitFields> {
    const dataSource = data?.sources?.[0]?.source ?? Sources.TPREK;
    const unitFieldTranslationsObject = (
      field: TranslatableFieldsFor<TprekUnitWithoutNull>
    ) =>
      data ? formTranslationObject<TprekUnitWithoutNull>(data, field) : null;

    return {
      id: getTprekId(dataSource, data?.id?.toString() ?? '') ?? '',
      organizationId: data?.org_id ?? null,
      departmentId: data?.dept_id ?? null,
      providerType: data?.provider_type ?? null,
      dataSource: dataSource,
      email: data?.email ?? null,
      postalCode: data?.address_zip ?? null,
      image: data?.picture_url ?? null,
      position: getPointFromLongAndLat(data?.longitude, data?.latitude),
      description: unitFieldTranslationsObject(
        'desc' as TranslatableFieldsFor<TprekUnitWithoutNull>
      ),
      shortDescription: unitFieldTranslationsObject(
        'short_desc' as TranslatableFieldsFor<TprekUnitWithoutNull>
      ),
      displayedServiceOwner: unitFieldTranslationsObject(
        'displayed_service_owner' as TranslatableFieldsFor<TprekUnitWithoutNull>
      ),
      displayedServiceOwnerType: data?.displayed_service_owner_type ?? null,
      name: unitFieldTranslationsObject('name'),
      streetAddress: unitFieldTranslationsObject(
        'street_address' as TranslatableFieldsFor<TprekUnitWithoutNull>
      ),
      addressLocality: unitFieldTranslationsObject(
        'address_city' as TranslatableFieldsFor<TprekUnitWithoutNull>
      ),
      addressPostalFull: unitFieldTranslationsObject(
        'address_postal_full' as TranslatableFieldsFor<TprekUnitWithoutNull>
      ),
      infoUrl: unitFieldTranslationsObject('www'),
      accessibilitySentences: formAccessibilitySentences(data),
      telephone: data?.phone ?? null,
      connections:
        data?.connections?.map((connection) => ({
          sectionType: connection.section_type,
          name: formTranslationObject(connection, 'name'),
          phone: connection.phone,
          url: formTranslationObject(connection, 'www'),
        })) ?? [],
    };
  }
}
