export function appendUnique<T>(
  existing: T[],
  incoming: T[],
  comparedProperty: keyof T
) {
  const existingValues = new Set(
    existing.map((e) => e[comparedProperty]) ?? []
  );
  return [
    ...existing,
    ...incoming.filter(
      (i) =>
        Object.hasOwnProperty.call(i, comparedProperty) &&
        !existingValues.has(i[comparedProperty])
    ),
  ];
}
