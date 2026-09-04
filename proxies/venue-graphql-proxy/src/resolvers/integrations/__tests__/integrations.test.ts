import { describe, it, expect, vi } from 'vitest';
import type VenueContext from '../../../context/VenueContext.js';
import IsOpenHaukiIntegration from '../IsOpenHaukiIntegration.js';
import OpeningHoursHaukiIntegration from '../OpeningHoursHaukiIntegration.js';

const createMockContext = (): VenueContext => {
  const mockContext = {} as VenueContext;
  mockContext.dataSources = {
    hauki: {
      getIsOpen: vi.fn(),
      getOpeningHours: vi.fn(),
    } as any,
  } as any;
  return mockContext;
};

describe('IsOpenHaukiIntegration', () => {
  it('formats isOpen data when is_open is true', async () => {
    const context = createMockContext();
    const mockConfig = {
      getId: vi.fn().mockReturnValue('hauki:1'),
    };

    (context.dataSources.hauki.getIsOpen as any).mockResolvedValue({
      is_open: true,
    });

    const integration = new IsOpenHaukiIntegration(mockConfig);
    const result = await integration.execute('tprek:123', 'tprek', context);

    expect(result.isOpen).toBe(true);
    expect(mockConfig.getId).toHaveBeenCalledWith('tprek:123', 'tprek');
  });

  it('formats isOpen data when is_open is false', async () => {
    const context = createMockContext();
    const mockConfig = {
      getId: vi.fn().mockReturnValue('hauki:1'),
    };

    (context.dataSources.hauki.getIsOpen as any).mockResolvedValue({
      is_open: false,
    });

    const integration = new IsOpenHaukiIntegration(mockConfig);
    const result = await integration.execute('tprek:123', 'tprek', context);

    expect(result.isOpen).toBe(false);
  });

  it('handles null isOpen data', async () => {
    const context = createMockContext();
    const mockConfig = {
      getId: vi.fn().mockReturnValue('hauki:1'),
    };

    (context.dataSources.hauki.getIsOpen as any).mockResolvedValue(null);

    const integration = new IsOpenHaukiIntegration(mockConfig);
    const result = await integration.execute('tprek:123', 'tprek', context);

    expect(result.isOpen).toBeNull();
  });
});

describe('OpeningHoursHaukiIntegration', () => {
  it('formats empty opening hours array', async () => {
    const context = createMockContext();
    const mockConfig = {
      getId: vi.fn().mockReturnValue('hauki:1'),
    };

    (context.dataSources.hauki.getOpeningHours as any).mockResolvedValue([]);

    const integration = new OpeningHoursHaukiIntegration(mockConfig);
    const result = await integration.execute('tprek:123', 'tprek', context);

    expect(result.openingHours).toStrictEqual([]);
  });

  it('formats opening hours with time elements', async () => {
    const context = createMockContext();
    const mockConfig = {
      getId: vi.fn().mockReturnValue('hauki:1'),
    };

    const mockOpeningHours = [
      {
        date: '2024-09-04',
        times: [
          {
            name: 'Morning',
            description: 'Morning hours',
            start_time: '09:00',
            end_time: '12:00',
            end_time_on_next_day: false,
            resource_state: 'open',
            full_day: false,
            periods: [],
          },
        ],
      },
    ];

    (context.dataSources.hauki.getOpeningHours as any).mockResolvedValue(
      mockOpeningHours
    );

    const integration = new OpeningHoursHaukiIntegration(mockConfig);
    const result = await integration.execute('tprek:123', 'tprek', context);

    expect(result.openingHours).toHaveLength(1);
    expect(result.openingHours[0].date).toBe('2024-09-04');
    expect(result.openingHours[0].times).toHaveLength(1);
    expect(result.openingHours[0].times[0].startTime).toBe('09:00');
    expect(result.openingHours[0].times[0].endTime).toBe('12:00');
  });

  it('handles null opening hours', async () => {
    const context = createMockContext();
    const mockConfig = {
      getId: vi.fn().mockReturnValue('hauki:1'),
    };

    (context.dataSources.hauki.getOpeningHours as any).mockResolvedValue(null);

    const integration = new OpeningHoursHaukiIntegration(mockConfig);
    const result = await integration.execute('tprek:123', 'tprek', context);

    expect(result.openingHours).toBeNull();
  });

  it('formats multiple opening hours days', async () => {
    const context = createMockContext();
    const mockConfig = {
      getId: vi.fn().mockReturnValue('hauki:1'),
    };

    const mockOpeningHours = [
      {
        date: '2024-09-04',
        times: [
          {
            name: 'Day',
            description: 'Full day',
            start_time: '08:00',
            end_time: '20:00',
            end_time_on_next_day: false,
            resource_state: 'open',
            full_day: false,
            periods: [],
          },
        ],
      },
      {
        date: '2024-09-05',
        times: [
          {
            name: 'Day',
            description: 'Full day',
            start_time: '08:00',
            end_time: '20:00',
            end_time_on_next_day: false,
            resource_state: 'open',
            full_day: false,
            periods: [],
          },
        ],
      },
    ];

    (context.dataSources.hauki.getOpeningHours as any).mockResolvedValue(
      mockOpeningHours
    );

    const integration = new OpeningHoursHaukiIntegration(mockConfig);
    const result = await integration.execute('tprek:123', 'tprek', context);

    expect(result.openingHours).toHaveLength(2);
    expect(result.openingHours[0].date).toBe('2024-09-04');
    expect(result.openingHours[1].date).toBe('2024-09-05');
  });
});
