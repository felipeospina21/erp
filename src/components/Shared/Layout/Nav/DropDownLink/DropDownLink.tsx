import React from 'react';
import { ListItem, Menu, MenuButton, MenuList, MenuItem, Link } from '@chakra-ui/react';

export interface DropDownLinkProps {
  moduleName: string;
  children: JSX.Element[];
}

export function DropDownLink({ moduleName, children }: DropDownLinkProps): JSX.Element {
  return (
    <ListItem>
      <Menu>
        <MenuButton as={Link}>{moduleName}</MenuButton>
        <MenuList>
          {children.map((element, idx) => (
            <MenuItem key={idx}>{element}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    </ListItem>
  );
}
