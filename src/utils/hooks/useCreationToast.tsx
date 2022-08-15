import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export function useCreationToast(
  isSuccess: boolean,
  isUninitialized: boolean,
  isLoading: boolean,
  successMessage: string
): void {
  const toast = useToast();
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Creacion Exitosa',
        description: successMessage,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }

    if (!isSuccess && !isUninitialized && !isLoading) {
      toast({
        title: 'Error En Creacion',
        description: 'ha ocurrido un error, favor intentar de nuevo',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    return () => {
      toast.closeAll();
    };
  }, [isSuccess, isUninitialized, isLoading, successMessage, toast]);
}
