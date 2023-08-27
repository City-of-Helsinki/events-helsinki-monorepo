import type {
  IsOpenType,
  OpeningHoursType,
} from '../datasources/HaukiDataSource';
import type { TranslatedVenueDetails } from '../types';

// Map each property of T to function of same name whose return type is property's type
type GettersForProperties<T> = {
  [Property in keyof T]: (params: {
    [P in Property]: T[Property];
  }) => T[Property];
};

type HaukiPropertyGetters = {
  openingHours(
    { openingHours }: { openingHours: OpeningHoursType },
    _: unknown,
    { isHaukiEnabled }: { isHaukiEnabled: boolean }
  ): OpeningHoursType | null;

  isOpen(
    { isOpen }: { isOpen: IsOpenType },
    _: unknown,
    { isHaukiEnabled }: { isHaukiEnabled: boolean }
  ): IsOpenType | null;
};

type VenuePropertyGetters = GettersForProperties<TranslatedVenueDetails> &
  HaukiPropertyGetters;

const Venue: VenuePropertyGetters = {
  addressLocality: ({ addressLocality }) => addressLocality,
  addressPostalFull: ({ addressPostalFull }) => addressPostalFull,
  dataSource: ({ dataSource }) => dataSource,
  departmentId: ({ departmentId }) => departmentId,
  description: ({ description }) => description,
  displayedServiceOwner: ({ displayedServiceOwner }) => displayedServiceOwner,
  displayedServiceOwnerType: ({ displayedServiceOwnerType }) =>
    displayedServiceOwnerType,
  email: ({ email }) => email,
  id: ({ id }) => id,
  image: ({ image }) => image,
  infoUrl: ({ infoUrl }) => infoUrl,
  name: ({ name }) => name,
  organizationId: ({ organizationId }) => organizationId,
  position: ({ position }) => position,
  postalCode: ({ postalCode }) => postalCode,
  providerType: ({ providerType }) => providerType,
  shortDescription: ({ shortDescription }) => shortDescription,
  streetAddress: ({ streetAddress }) => streetAddress,
  telephone: ({ telephone }) => telephone,
  openingHours: ({ openingHours }, _: unknown, { isHaukiEnabled }) =>
    !isHaukiEnabled ? null : openingHours,
  isOpen: ({ isOpen }, _: unknown, { isHaukiEnabled }) =>
    !isHaukiEnabled ? null : isOpen,
  ontologyTree: ({ ontologyTree }) => (!ontologyTree ? [] : ontologyTree),
  ontologyWords: ({ ontologyWords }) => (!ontologyWords ? [] : ontologyWords),
  accessibilitySentences: ({ accessibilitySentences }) =>
    !accessibilitySentences ? [] : accessibilitySentences,
  connections: ({ connections }) => connections,
};

export default Venue;
