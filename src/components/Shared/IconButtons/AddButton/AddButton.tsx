import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { IconButtonProps } from '../types';
import { Add } from '@/assets/icons';

export function AddButton({
  ariaLabel,
  isLoading,
  onClick,
  margin = '1.5rem 1rem',
  size = 'lg',
  variant = 'primary_ghost',
}: Omit<IconButtonProps, 'colorVariant'>): JSX.Element {
  return (
    <IconButton
      aria-label={ariaLabel}
      role="button"
      icon={<Add />}
      size={size}
      m={margin}
      variant={variant}
      isLoading={isLoading}
      onClick={onClick}
    />
  );
}
