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
  const label = ![EnrolmentStatusLabel.noEnrolmentTimes].includes(status)
    ? text
    : null;

  if (label) {
    return <span className={className}>{label}</span>;
  }
  return null;
}

export default EventEnrolmentStatus;
