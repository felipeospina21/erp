export interface ToastConfig {
  status: 'info' | 'warning' | 'success' | 'error' | undefined;
  duration: number;
  isClosable: boolean;
  title?: string;
  description?: string;
}

export interface CustomToastOptions {
  success: ToastConfig;
  error: ToastConfig;
}

interface CustomToast {
  creation: CustomToastOptions;
  update: CustomToastOptions;
}

const error: ToastConfig = {
  description: 'ha ocurrido un error, favor intentar de nuevo',
  status: 'error',
  duration: 5000,
  isClosable: true,
};

const success: ToastConfig = {
  status: 'success',
  duration: 3000,
  isClosable: true,
};

export const toastConfig: CustomToast = {
  creation: {
    success: {
      title: 'Creación Exitosa',
      ...success,
    },
    error: {
      title: 'Error En Creación',
      ...error,
    },
  },
  update: {
    success: {
      title: 'Actualización Exitosa',
      ...success,
    },
    error: {
      title: 'Error En Actualización',
      ...error,
    },
  },
};
