/* eslint-disable @typescript-eslint/no-explicit-any */
const Venue = {
  addressLocality({ addressLocality }: any) {
    return addressLocality;
  },
  addressPostalFull({ addressPostalFull }: any) {
    return addressPostalFull;
  },
  dataSource({ dataSource }: any) {
    return dataSource;
  },
  departmentId({ departmentId }: any) {
    return departmentId;
  },
  description({ description }: any) {
    return description;
  },
  displayedServiceOwner({ displayedServiceOwner }: any) {
    return displayedServiceOwner;
  },
  displayedServiceOwnerType({ displayedServiceOwnerType }: any) {
    return displayedServiceOwnerType;
  },
  email({ email }: any) {
    return email;
  },
  id({ id }: any) {
    return id;
  },
  image({ image }: any) {
    return image;
  },
  infoUrl({ infoUrl }: any) {
    return infoUrl;
  },
  name({ name }: any) {
    return name;
  },
  organizationId({ organizationId }: any) {
    return organizationId;
  },
  position({ position }: any) {
    return position;
  },
  postalCode({ postalCode }: any) {
    return postalCode;
  },
  providerType({ providerType }: any) {
    return providerType;
  },
  shortDescription({ shortDescription }: any) {
    return shortDescription;
  },
  streetAddress({ streetAddress }: any) {
    return streetAddress;
  },
  telephone({ telephone }: any) {
    return telephone;
  },
  openingHours({ openingHours }: any, _: any, { haukiEnabled }: any) {
    if (!haukiEnabled) {
      return null;
    }

    return openingHours;
  },
  isOpen({ isOpen }: any, _: any, { haukiEnabled }: any) {
    if (!haukiEnabled) {
      return null;
    }

    return isOpen;
  },
  ontologyTree({ ontologyTree }: any) {
    if (!ontologyTree) {
      return [];
    }

    return ontologyTree;
  },
  ontologyWords({ ontologyWords }: any) {
    if (!ontologyWords) {
      return [];
    }

    return ontologyWords;
  },
  accessibilitySentences({ accessibilitySentences }: any) {
    if (!accessibilitySentences) {
      return [];
    }

    return accessibilitySentences;
  },
  connections({ connections }: any) {
    return connections;
  },
};

export default Venue;
