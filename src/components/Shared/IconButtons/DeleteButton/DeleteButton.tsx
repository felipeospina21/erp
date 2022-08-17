import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { Delete } from '@/assets/icons';
import { IconButtonProps } from '../types';

export function DeleteButton({
  onClick,
  isDisabled,
  isLoading,
  color = 'custom.red.500',
  size = 'lg',
  variant = 'ghost',
}: IconButtonProps): JSX.Element {
  return (
    <>
      <IconButton
        aria-label="eliminar"
        icon={<Delete />}
        size={size}
        color={color}
        variant={variant}
        isLoading={isLoading}
        isDisabled={isDisabled}
        onClick={onClick}
      />
    </>
  );
}
