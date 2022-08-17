import React from 'react';
import NextLink from 'next/link';
import { List, ListItem, Box } from '@chakra-ui/react';
import { DropDownLink } from './NavMenu/DropDownLink/DropDownLink';

export interface NavLinksProps {
  onClose: () => void;
}

export function NavLinks({ onClose }: NavLinksProps): JSX.Element {
  return (
    <List spacing={3}>
      <StyledLink href="/" text="Home" onClose={onClose} />
      <StyledLink href="/clientes" text="Clientes" onClose={onClose} />
      <StyledLink href="/productos" text="Productos" onClose={onClose} />
      <StyledLink href="/costos" text="Test" onClose={onClose} />
      <DropDownLink moduleName="Ventas">
        <StyledLink href="/ventas/nueva-venta" text="Crear Venta" onClose={onClose} />
        <StyledLink href="/ventas/listado-ventas" text="Listado Ventas" onClose={onClose} />
      </DropDownLink>
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

export interface LinkButtonProps extends LinkProps {
  onClick: () => void;
}

const LinkButton = React.forwardRef(
  (
    { onClick, href, text }: LinkButtonProps,
    ref: React.LegacyRef<HTMLAnchorElement> | undefined
  ): JSX.Element => {
    return (
      <>
        <a href={href} onClick={onClick} ref={ref}>
          {text}
        </a>
      </>
    );
  }
);
LinkButton.displayName = 'LinkButton';

const StyledLink = ({ href, text, onClose }: StyledLinkProps): JSX.Element => (
  <ListItem>
    <NextLink href={href ?? ''} passHref>
      <Box color="brand.grey.800" as="button" _hover={{ textDecor: 'underline' }}>
        <LinkButton text={text} onClick={onClose} />
      </Box>
    </NextLink>
  </ListItem>
);
