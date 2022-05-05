import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { Edit } from '@/assets/icons';
import { IconButtonProps } from '../types';

export function EditButton({
  isLoading,
  onClick,
  size = 'lg',
  colorVariant = 500,
  variant = 'ghost',
}: IconButtonProps): JSX.Element {
  return (
    <IconButton
      aria-label="Edit"
      icon={<Edit />}
      size={size}
      color={`brand.green.${colorVariant}`}
      variant={variant}
      isLoading={isLoading}
      onClick={onClick}
    />
  );
}
