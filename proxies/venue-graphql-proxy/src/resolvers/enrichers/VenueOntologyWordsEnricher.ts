import type VenueContext from '../../context/VenueContext';
import type {
  TprekOntologyVocabulary,
  TprekOntologyWord,
  TprekUnit,
  TprekUnitWithoutNull,
  TranslatableOntologyIdLabel,
  TranslatedVenueDetails,
} from '../../types';
import {
  formTranslationObject,
  translateOntologyIdLabels,
} from '../../utils/utils';
import type VenueEnricher from './VenueEnricher';

function makeTranslatableOntologyIdLabel(
  ontologyWord: TprekOntologyWord
): TranslatableOntologyIdLabel {
  return {
    id: ontologyWord.id,
    label: formTranslationObject(ontologyWord, 'ontologyword'),
  };
}

function makeTranslatableOntologyIdLabels(
  ontologyVocabulary: TprekOntologyVocabulary
): TranslatableOntologyIdLabel[] {
  return ontologyVocabulary.map((ontologyWord) =>
    makeTranslatableOntologyIdLabel(ontologyWord)
  );
}

export default class VenueOntologyWordsEnricher
  implements
    VenueEnricher<TprekUnit, Pick<TranslatedVenueDetails, 'ontologyWords'>>
{
  async getOntologyTree(
    ontologyWordIds: NonNullable<TprekUnitWithoutNull['ontologyword_ids']>,
    context: VenueContext
  ) {
    return context.dataSources.serviceMap
      .getOntologyWordsSubset(ontologyWordIds)
      .then(makeTranslatableOntologyIdLabels)
      .then((ontologyIdLabels) =>
        translateOntologyIdLabels(ontologyIdLabels, context)
      );
  }

  async getEnrichments(data: TprekUnit, context: VenueContext) {
    return {
      ontologyWords: data?.ontologyword_ids
        ? await this.getOntologyTree(data?.ontologyword_ids, context)
        : [],
    };
  }
}
