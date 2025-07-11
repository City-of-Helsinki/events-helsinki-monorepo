import type VenueContext from '../../context/VenueContext.js';
import type {
  TprekUnit,
  TprekUnitWithoutNull,
  TranslatedVenueDetails,
} from '../../types.js';
import {
  makeTranslatableDepartment,
  translateDepartment,
} from '../../utils/utils.js';
import type VenueEnricher from './VenueEnricher.js';

export default class VenueOrganizationEnricher
  implements
    VenueEnricher<TprekUnit, Pick<TranslatedVenueDetails, 'organization'>>
{
  async getOrganization(
    organizationId: NonNullable<TprekUnitWithoutNull['org_id']>,
    context: VenueContext
  ) {
    return context.dataSources.serviceMap
      .getOrganization(organizationId)
      .then(makeTranslatableDepartment)
      .then((department) => translateDepartment(department, context));
  }

  async getEnrichments(data: TprekUnit, context: VenueContext) {
    return {
      organization: data?.org_id
        ? await this.getOrganization(data.org_id, context)
        : null,
    };
  }
}
