import React from 'react';
import { Button } from '@chakra-ui/react';

export interface CustomButtonProps {
  status?: boolean;
  color: string;
  children: string;
  onClick: () => void;
}

export function CustomButton({ status, color, children, onClick }: CustomButtonProps): JSX.Element {
  return (
    <Button
      isDisabled={status ?? false}
      colorScheme={color}
      w='8rem'
      m='0.5rem 1rem'
      p='0.5rem 2rem'
      onClick={onClick}>
      {children}
    </Button>
  );
}
