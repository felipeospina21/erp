import React from 'react';
import {
  Avatar,
  Flex,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { DownArrow } from '@/assets/icons';
import { UserData } from '@/redux/services';

export interface UserMenuProps {
  user: UserData;
  menuItemClickFn: {
    [name: string]: () => void;
  };
}
export default function UserMenu({
  user: { firstName, lastName, image, email },
  menuItemClickFn: { handleLogout },
}: UserMenuProps): JSX.Element {
  return (
    <Flex
      align="center"
      flexDir={['row']}
      justify={['center', null, 'space-between']}
      wrap="wrap"
      w={['10rem', '12rem']}
      p={['0', '0 0.5rem']}
    >
      <Avatar size="sm" name={`${firstName} ${lastName}`} src={image} />
      <Menu id="user-menu" isLazy>
        <MenuButton
          id="user-menu-btn-desktop"
          as={Button}
          display={['none', null, 'inherit']}
          {...ButtonProps}
        >
          {email}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>

      {/* Mobile Menu */}
      <Menu id="user-menu-mobile" isLazy>
        <MenuButton
          id="user-menu-btn-mobile"
          as={IconButton}
          display={['inherit', null, 'none']}
          {...ButtonProps}
        />
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

const ButtonProps = {
  rightIcon: <DownArrow />,
  variant: 'ghost',
  p: ['0', '0 0.3rem'],
  fontSize: ['0.7rem', '0.8rem'],
  color: 'brand.grey.200',
  _hover: { backgroundColor: ['transparent', 'rgba(255,255,255,0.1)'] },
  _focus: { boxShadow: ['none', null, 'var(--chakra-shadows-outline)'] },
  _active: { backgroundColor: 'none' },
};
