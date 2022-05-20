import React from 'react';
import { Button } from '@chakra-ui/react';

export interface CustomButtonProps {
  status?: boolean;
  variant:
    | 'accept'
    | 'accept_light'
    | 'accept_dark'
    | 'reject'
    | 'reject'
    | 'reject_light'
    | 'reject_dark'
    | 'accept_outline'
    | 'accept_dark_outline'
    | 'reject_outline'
    | 'reject_light_outline'
    | 'reject_dark_outline';
  children: string;
  margin?: string;
  width?: string;
  padding?: string;
  fontSize?: string;
  onClick: () => void;
}

export function CustomButton({
  status,
  variant,
  children,
  onClick,
  margin = '0.5rem 1rem',
  width = '8rem',
  padding = '0.5rem 2rem',
  fontSize = 'md',
}: CustomButtonProps): JSX.Element {
  return (
    <Button
      isDisabled={status ?? false}
      variant={variant}
      w={width}
      m={margin}
      p={padding}
      onClick={onClick}
      fontSize={fontSize}
    >
      {children}
    </Button>
  );
}
