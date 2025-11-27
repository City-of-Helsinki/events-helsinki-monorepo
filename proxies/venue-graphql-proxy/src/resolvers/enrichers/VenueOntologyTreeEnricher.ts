import type VenueContext from '../../context/VenueContext.js';
import type {
  TprekOntologyForest,
  TprekOntologyTreeNode,
  TprekUnit,
  TprekUnitWithoutNull,
  TranslatableOntologyIdLabel,
  TranslatedVenueDetails,
} from '../../types.js';
import {
  formTranslationObject,
  translateOntologyIdLabels,
} from '../../utils/utils.js';
import type VenueEnricher from './VenueEnricher.js';

function makeTranslatableOntologyIdLabel(
  ontologyTreeNode: TprekOntologyTreeNode
): TranslatableOntologyIdLabel {
  return {
    id: ontologyTreeNode.id,
    label: formTranslationObject(ontologyTreeNode, 'name'),
  };
}

function makeTranslatableOntologyIdLabels(
  ontologyForest: TprekOntologyForest
): TranslatableOntologyIdLabel[] {
  return ontologyForest.map((ontologyTreeNode) =>
    makeTranslatableOntologyIdLabel(ontologyTreeNode)
  );
}

export default class VenueOntologyTreeEnricher implements VenueEnricher<
  TprekUnit,
  Pick<TranslatedVenueDetails, 'ontologyTree'>
> {
  async getOntologyTree(
    ontologyTreeIds: NonNullable<TprekUnitWithoutNull['ontologytree_ids']>,
    context: VenueContext
  ) {
    return context.dataSources.serviceMap
      .getOntologyTreeSubset(ontologyTreeIds)
      .then(makeTranslatableOntologyIdLabels)
      .then((ontologyIdLabels) =>
        translateOntologyIdLabels(ontologyIdLabels, context)
      );
  }

  async getEnrichments(data: TprekUnit, context: VenueContext) {
    return {
      ontologyTree: data?.ontologytree_ids
        ? await this.getOntologyTree(data?.ontologytree_ids, context)
        : [],
    };
  }
}
