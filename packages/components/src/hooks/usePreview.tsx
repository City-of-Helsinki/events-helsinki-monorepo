import { toast } from 'react-toastify';

function usePreview(message: string, isPreview: boolean) {
  if (isPreview) {
    toast.warning(message, {
      toastId: 'previewToast',
      position: 'top-right',
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
    });
  }
}

export default usePreview;
