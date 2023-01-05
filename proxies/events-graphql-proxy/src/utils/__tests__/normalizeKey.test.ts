import normalizeKey from '../normalizeKey';

describe('normalizeKey function', () => {
  it('should normalize entered key', () => {
    expect(normalizeKey('@event_type')).toBe('internalEventType');
    expect(normalizeKey('event_end_date')).toBe('eventEndDate');
  });
});
