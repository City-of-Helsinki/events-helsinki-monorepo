import { Notification, NotificationSize } from 'hds-react';
import React, { useEffect, useState } from 'react';

import { usePreview, useResilientTranslation } from '../../hooks';

interface Props {
  token: string;
}

const PreviewNotification: React.FC<Props> = ({ token }) => {
  const { resilientT } = useResilientTranslation();
  const [expires, setExpires] = useState(0);
  const { minutesLeft } = usePreview(token);

  const text = resilientT('page:preview')?.replace('{0}', expires.toString());

  // extra use effect is needed to fix rehydration issue with timer
  useEffect(() => {
    setExpires(minutesLeft);
  }, [minutesLeft]);

  if (!minutesLeft || !token || minutesLeft <= 0) return null;

  return (
    <Notification
      type="alert"
      label={text}
      position="top-right"
      displayAutoCloseProgress={false}
      size={NotificationSize.Small}
    >
      {text}
    </Notification>
  );
};

export default PreviewNotification;
