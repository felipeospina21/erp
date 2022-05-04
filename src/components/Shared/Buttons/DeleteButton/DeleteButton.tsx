import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { Delete } from '@/assets/icons';
import { IconButtonProps } from '../types';

export function DeleteButton({
  isLoading,
  onClick,
  size = 'lg',
  colorVariant = 500,
  variant = 'ghost',
}: IconButtonProps): JSX.Element {
  return (
    <IconButton
      aria-label="eliminar"
      icon={<Delete />}
      size={size}
      color={`brand.red.${colorVariant}`}
      variant={variant}
      isLoading={isLoading}
      onClick={onClick}
    />
  );
}
