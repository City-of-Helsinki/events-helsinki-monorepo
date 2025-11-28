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

export default class VenueDepartmentEnricher implements VenueEnricher<
  TprekUnit,
  Pick<TranslatedVenueDetails, 'department'>
> {
  async getDepartment(
    departmentId: NonNullable<TprekUnitWithoutNull['dept_id']>,
    context: VenueContext
  ) {
    return context.dataSources.serviceMap
      .getDepartment(departmentId)
      .then(makeTranslatableDepartment)
      .then((department) => translateDepartment(department, context));
  }

  async getEnrichments(data: TprekUnit, context: VenueContext) {
    return {
      department: data?.dept_id
        ? await this.getDepartment(data.dept_id, context)
        : null,
    };
  }
}
