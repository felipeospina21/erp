import React from 'react';
import { Button } from '@chakra-ui/react';

export interface BtnProps {
  status?: boolean;
  color: string;
  children: string;
  onClick: () => void;
}

const Btn = ({ status, color, children, onClick }: BtnProps): JSX.Element => {
  return (
    <Button isDisabled={status ?? false} colorScheme={color} w='8rem' m='0.5rem 1rem' p='0.5rem 2rem' onClick={onClick}>
      {children}
    </Button>
  );
};

export default Btn;
