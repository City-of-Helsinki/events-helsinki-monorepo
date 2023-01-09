import type { NotificationType, NotificationProps } from 'hds-react';
import { Notification } from 'hds-react';
import type { ToastContentProps } from 'react-toastify';
import { toast } from 'react-toastify';
import useCommonTranslation from '../hooks/useCommonTranslation';

type NotificationOptions = Omit<Partial<NotificationProps>, 'size'>;

type ShowToastArgs = {
  title: string;
  message: string;
  type: NotificationType;
  options?: NotificationOptions;
};

type ToastProps = {
  closeToast?: ToastContentProps['closeToast'];
} & ShowToastArgs;

function Toast({ closeToast, title, message, type, options }: ToastProps) {
  const { t } = useCommonTranslation();

  return (
    <Notification
      label={title}
      position="top-right"
      dismissible
      closeButtonLabelText={t('common:button.close')}
      type={type}
      onClose={closeToast}
      {...options}
    >
      {message}
    </Notification>
  );
}

export default function showToast({
  title,
  message,
  type = 'error',
  options,
}: ShowToastArgs) {
  toast((content: ToastContentProps<unknown>) => (
    <Toast
      {...content}
      title={title}
      message={message}
      type={type}
      options={options}
    />
  ));
}
