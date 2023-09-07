import AppConfig from '../config/AppConfig';
import type { TranslatedVenueDetails } from '../types';

// Map each property of T to function of same name whose return type is property's type
type GettersForProperties<T> = {
  [Property in keyof T]: (params: {
    [P in Property]: T[Property];
  }) => T[Property];
};

const Venue: GettersForProperties<TranslatedVenueDetails> = {
  addressLocality: ({ addressLocality }) => addressLocality,
  addressPostalFull: ({ addressPostalFull }) => addressPostalFull,
  dataSource: ({ dataSource }) => dataSource,
  departmentId: ({ departmentId }) => departmentId,
  department: ({ department }) => department,
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
  organization: ({ organization }) => organization,
  position: ({ position }) => position,
  postalCode: ({ postalCode }) => postalCode,
  providerType: ({ providerType }) => providerType,
  shortDescription: ({ shortDescription }) => shortDescription,
  streetAddress: ({ streetAddress }) => streetAddress,
  telephone: ({ telephone }) => telephone,
  openingHours: ({ openingHours }) =>
    AppConfig.isHaukiEnabled ? openingHours : null,
  isOpen: ({ isOpen }) => (AppConfig.isHaukiEnabled ? isOpen : null),
  ontologyTree: ({ ontologyTree }) => (!ontologyTree ? [] : ontologyTree),
  ontologyWords: ({ ontologyWords }) => (!ontologyWords ? [] : ontologyWords),
  accessibilitySentences: ({ accessibilitySentences }) =>
    !accessibilitySentences ? [] : accessibilitySentences,
  connections: ({ connections }) => connections,
};

export default Venue;
