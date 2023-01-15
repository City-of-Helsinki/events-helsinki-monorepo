import type { VenueData } from '../integrations/VenueResolverIntegration';
import type { Context, TprekUnit } from '../types';
import type VenueEnricher from './VenueEnricher';

export default class VenueOntologyEnricher
  implements VenueEnricher<TprekUnit, VenueData>
{
  async getEnrichments(data: TprekUnit, context: Context) {
    const enrichDataLocations = [];
    const {
      ontologytree_ids: ontologyTreeIds,
      ontologyword_ids: ontologyWordIds,
    } = data;
    const { language, dataSources } = context;
    if (ontologyTreeIds && Array.isArray(ontologyTreeIds)) {
      enrichDataLocations.push(
        dataSources.tprek
          .getOntologyTree(ontologyTreeIds)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((ontologyTree: any) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ontologyTree?.map((tree: any) => {
              const labels = {
                fi: tree.name_fi,
                sv: tree.name_sv,
                en: tree.name_en,
              };
              const label = language ? labels[language] : labels;

              return {
                id: tree.id,
                label,
              };
            })
          )
      );
    }

    if (ontologyWordIds && Array.isArray(ontologyWordIds)) {
      enrichDataLocations.push(
        dataSources.tprek
          .getOntologyWords(ontologyWordIds)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((ontologyWords: any) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ontologyWords?.map((word: any) => {
              const labels = {
                fi: word.ontologyword_fi,
                sv: word.ontologyword_sv,
                en: word.ontologyword_en,
              };
              const label = language ? labels[language] : labels;

              return {
                id: word.id,
                label,
              };
            })
          )
      );
    }

    const [ontologyTree = [], ontologyWords = []] = await Promise.all(
      enrichDataLocations
    );

    return { ontologyTree, ontologyWords };
  }
}
