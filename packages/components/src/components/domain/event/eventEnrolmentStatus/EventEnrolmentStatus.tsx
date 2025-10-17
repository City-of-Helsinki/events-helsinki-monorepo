import { EnrolmentStatusLabel } from '../../../../constants';
import type { EventFields } from '../../../../types';
import useEnrolmentStatus from './useEventEnrolmentStatus';

function EventEnrolmentStatus({
  event,
  className,
}: {
  event: EventFields;
  className?: string;
}) {
  const { status, text } = useEnrolmentStatus(event);
  const linkArrowLabel =
    [EnrolmentStatusLabel.noEnrolmentTimes].includes(status) === false
      ? text
      : null;

  if (linkArrowLabel) {
    return <span className={className}>{linkArrowLabel}</span>;
  }
  return null;
}

export default EventEnrolmentStatus;
