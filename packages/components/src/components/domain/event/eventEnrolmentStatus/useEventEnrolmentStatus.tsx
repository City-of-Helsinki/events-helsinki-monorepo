import { useMemo } from 'react';
import {
  useCommonTranslation,
  useEventTranslation,
  useLocale,
  useSuperEventLazyLoad,
} from '../../../../hooks';
import type { EventFields } from '../../../../types';
import getDateRangeStr from '../../../../utils/getDateRangeStr';
import { getEnrolmentStatus } from '../../../../utils/getEventEnrolmentStatus';

function useEventEnrolmentStatus(event: EventFields) {
  const { superEvent, superEventLoading } = useSuperEventLazyLoad(event);

  const locale = useLocale();
  const { t: eventTranslation } = useEventTranslation();
  const { t: commonTranslation } = useCommonTranslation();

  const result = useMemo(() => {
    const status = getEnrolmentStatus(event, superEvent?.data ?? undefined);

    const text = eventTranslation(`event:enrolmentStatus.${status}`, {
      date: event.enrolmentStartTime
        ? getDateRangeStr({
            start: event.enrolmentStartTime,
            locale,
            includeWeekday: false,
            includeTime: true,
            timeAbbreviation: commonTranslation('common:timeAbbreviation'),
          })
        : '',
    });

    return { status, text, loading: superEventLoading };
  }, [
    event,
    superEvent?.data,
    eventTranslation,
    locale,
    commonTranslation,
    superEventLoading,
  ]);

  return result;
}

export default useEventEnrolmentStatus;
