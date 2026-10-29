import { getCollections } from '@city-of-helsinki/react-helsinki-headless-cms';

export default function getSerializableCollections(
  modules: Parameters<typeof getCollections>[0]
) {
  const collections = getCollections(modules) ?? [];
  return JSON.parse(JSON.stringify(collections)) as typeof collections;
}
