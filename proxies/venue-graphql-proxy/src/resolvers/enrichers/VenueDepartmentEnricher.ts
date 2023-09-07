import type VenueContext from '../../context/VenueContext';
import type {
  TprekUnit,
  TprekUnitWithoutNull,
  TranslatedVenueDetails,
} from '../../types';
import {
  makeTranslatableDepartment,
  translateDepartment,
} from '../../utils/utils';
import type VenueEnricher from './VenueEnricher';

export default class VenueDepartmentEnricher
  implements
    VenueEnricher<TprekUnit, Pick<TranslatedVenueDetails, 'department'>>
{
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
