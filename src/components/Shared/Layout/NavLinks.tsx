import React from 'react';
import NextLink from 'next/link';
import { List, ListItem, Box } from '@chakra-ui/react';

export interface NavLinksProps {
  onClose: () => void;
}

export function NavLinks({ onClose }: NavLinksProps): JSX.Element {
  return (
    <List spacing={3}>
      <StyledLink href='/' text='Home' onClose={onClose} />
      <StyledLink href='/ventas' text='Ventas' onClose={onClose} />
      <StyledLink href='/clientes' text='Clientes' onClose={onClose} />
      <StyledLink href='/costos' text='Costos' onClose={onClose} />
    </List>
  );
}

export default NavLinks;

// MyButton allows closing menu when clicking link
export interface LinkProps {
  href?: string;
  text?: string;
}
export interface StyledLinkProps extends LinkProps {
  onClose: () => void;
}

export interface MyButtonProps extends LinkProps {
  onClick: () => void;
}

const MyButton = React.forwardRef(
  (
    { onClick, href, text }: MyButtonProps,
    ref: React.LegacyRef<HTMLAnchorElement> | undefined
  ): JSX.Element => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        {text}
      </a>
    );
  }
);
MyButton.displayName = 'MyButton';

const StyledLink = ({ href, text, onClose }: StyledLinkProps): JSX.Element => (
  <ListItem>
    <NextLink href={href ?? ''} passHref>
      <Box color='brand.grey.800' as='button' _hover={{ textDecor: 'underline' }}>
        <MyButton text={text} onClick={onClose} />
      </Box>
    </NextLink>
  </ListItem>
);
