import type { DirectionPoint, Venue } from 'events-helsinki-components';
import { InfoBlock } from 'events-helsinki-components';
import {
  IconClock,
  IconInfoCircle,
  IconLocation,
  IconMap,
  IconPhone,
  IconQuestionCircle,
} from 'hds-react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import {
  getGoogleDirectionsUrl,
  getHSLDirectionsUrl,
  getVenueDirectionPoint,
} from '../utils/getVenueDirections';

export const HSLInfoLink = ({
  directionPoint,
}: {
  directionPoint: DirectionPoint;
}) => (
  <InfoBlock.Link
    key="hsl"
    href={getHSLDirectionsUrl(null, directionPoint)}
    label={'venue:location.directionsGoogle'}
    iconRight={null}
    Component={SecondaryLink}
  />
);

export const GoogleInfoLink = ({
  directionPoint,
}: {
  directionPoint: DirectionPoint;
}) => (
  <InfoBlock.Link
    key="google"
    href={getGoogleDirectionsUrl(null, directionPoint)}
    label={'venue:location.directionsHSL'}
    iconRight={null}
    Component={SecondaryLink}
  />
);

export const VenueInformationLinks = ({
  venue: { infoUrl, facebook, youtube, instagram, twitter, connections },
}: {
  venue: Venue & {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
}) => {
  const otherInformationLinksContents = connections?.filter(
    (item) => item?.url && item?.sectionType === 'LINK'
  );
  const links = [
    {
      url: infoUrl,
      name: 'link.info.label',
      id: 'web',
    },
    {
      url: facebook,
      name: 'link.facebook.label',
      id: 'fb',
    },
    {
      url: youtube,
      name: 'link.youtube.label',
      id: 'yt',
    },
    {
      url: instagram,
      name: 'link.instagram.label',
      id: 'ig',
    },
    {
      url: twitter,
      name: 'link.twitter.label',
      id: 'tw',
    },
  ];

  return (
    <InfoBlock.List
      key="other-and-social-media-links"
      items={otherInformationLinksContents
        .concat(links)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((acc: any[], link) => {
          if (!link?.url || !link?.name) {
            return acc;
          }

          return [
            ...acc,
            <InfoBlock.Link
              key={`link-${link.name}`}
              href={link.url}
              label={link.name}
            />,
          ];
        }, [])}
    />
  );
};

const VenueInfo = ({ venue }: { venue: Venue }) => {
  const { email, telephone, connections } = venue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionOpeningHoursSectionsContents: any[] = connections
    ?.filter((item) => item?.sectionType === 'OPENING_HOURS')
    ?.map((item) => item?.name);

  const connectionOpeningHoursSectionsLines =
    connectionOpeningHoursSectionsContents.join('\n\n').split('\n');

  const contactDetailsSectionsContents = connections?.filter(
    (item) => item?.sectionType === 'PHONE_OR_EMAIL'
  );

  const hasContactDetails = Boolean(
    email || telephone || contactDetailsSectionsContents?.length > 0
  );

  // Data that can't be found from the API at this point
  const temperature = null;
  const organizer = null;
  const directionPoint = getVenueDirectionPoint(venue);
  const hslInfoLink = directionPoint && (
    <HSLInfoLink directionPoint={directionPoint} />
  );
  const googleInfoLink = directionPoint && (
    <GoogleInfoLink directionPoint={directionPoint} />
  );
  return (
    <>
      {connectionOpeningHoursSectionsContents.length > 0 && (
        <InfoBlock
          headingLevel="h3"
          icon={<IconClock aria-hidden="true" />}
          name={'block.opening_hours.label'}
          contents={[
            <InfoBlock.Expand
              key="connectionOpeningHours"
              lines={connectionOpeningHoursSectionsLines}
              initialVisibleLinesCount={10}
            />,
          ]}
        />
      )}
      {temperature && (
        <InfoBlock
          headingLevel="h3"
          icon={<IconQuestionCircle aria-hidden="true" />}
          name="Veden tiedot"
          contents={[
            '+22 astetta, ei sinilevää\nPäivitetty 21.7.2021 klo 12:12',
          ]}
        />
      )}
      {hasContactDetails && (
        <InfoBlock
          headingLevel="h3"
          icon={<IconPhone aria-hidden="true" />}
          name={'block.contact_details.label'}
          contents={[
            <InfoBlock.List
              key="contact-details-main"
              items={[telephone ?? '', email ?? '']}
            />,
            ...(contactDetailsSectionsContents?.map((contact, i) => (
              <InfoBlock.List
                key={`contact-details-other-${i}`}
                items={[contact?.name ?? '', contact?.phone ?? '']}
              />
            )) ?? []),
          ]}
        />
      )}
      <InfoBlock
        headingLevel="h3"
        icon={<IconInfoCircle aria-hidden="true" />}
        name={'block.other_information.label'}
        contents={[
          <VenueInformationLinks
            key={`venueInformationLinks-${venue.id}`}
            venue={venue}
          />,
        ]}
      />
      <InfoBlock
        headingLevel="h3"
        icon={<IconMap aria-hidden="true" />}
        name={'block.route.label'}
        contents={[
          <InfoBlock.List
            key="directions-hsl"
            items={hslInfoLink ? [hslInfoLink] : []}
          />,
          <InfoBlock.List
            key="directions-google"
            items={googleInfoLink ? [googleInfoLink] : []}
          />,
        ]}
      />
      {organizer && (
        <InfoBlock
          headingLevel="h3"
          icon={<IconLocation aria-hidden="true" />}
          name="Liikunnan tiedot"
          contents={[
            <InfoBlock.List
              key="sports-info"
              items={[
                'Helsingin kaupunki,',
                'Kulttuurin ja vapaa-ajan toimiala',
                '040 123 4567',
                'email@email.com',
              ]}
            />,
            <InfoBlock.Link
              key="organizer-link"
              href="#"
              label="Katso muut järjestäjän tapahtumat"
            />,
          ]}
        />
      )}
    </>
  );
};

export default VenueInfo;
