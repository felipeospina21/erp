import React from 'react';
import { Button } from '@chakra-ui/react';

export interface CustomButtonProps {
  status?: boolean;
  variant: string;
  children: string;
  onClick: () => void;
}

export function CustomButton({
  status,
  variant,
  children,
  onClick,
}: CustomButtonProps): JSX.Element {
  return (
    <Button
      isDisabled={status ?? false}
      variant={variant}
      w="8rem"
      m="0.5rem 1rem"
      p="0.5rem 2rem"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
