import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import type { CustomToastOptions } from '../toasts/toastsConfig';

export function useCustomToast(
  isSuccess: boolean,
  isUninitialized: boolean,
  isLoading: boolean,
  successMessage: string,
  toastConfig: CustomToastOptions
): void {
  const toast = useToast();
  useEffect(() => {
    if (isSuccess) {
      toast({
        description: successMessage,
        ...toastConfig.success,
      });
    }

    if (!isSuccess && !isUninitialized && !isLoading) {
      toast({
        ...toastConfig.error,
      });
    }
    return () => {
      toast.closeAll();
    };
  }, [
    isSuccess,
    isUninitialized,
    isLoading,
    successMessage,
    toastConfig.success,
    toastConfig.error,
    toast,
  ]);
}
