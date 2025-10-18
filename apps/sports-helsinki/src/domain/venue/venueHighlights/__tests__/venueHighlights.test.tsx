import { venueHighlightKey } from '../VenueHighlights';

it.each([
  {
    connection: {
      name: '',
      sectionType: 'HIGHLIGHT' as const,
    },
    expectedOutput:
      'venue-highlight-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    connection: {
      name: 'Test venue name',
      sectionType: 'HIGHLIGHT' as const,
    },
    expectedOutput:
      'venue-highlight-e4bad7384d70322d1622c65ca71aeee2f453a20ae67d6ca5f80730912f736fee',
  },
  {
    connection: {
      name: 'Ääkköspaikanimi',
      sectionType: 'HIGHLIGHT' as const,
    },
    expectedOutput:
      'venue-highlight-ee0f86913a89f0e6c8e558853d921af886dc32d8f176b243fa32695ddbf33a09',
  },
])(
  'venueHighlightKey($connection) == $expectedOutput',
  ({ connection, expectedOutput }) =>
    expect(venueHighlightKey(connection)).toStrictEqual(expectedOutput)
);
