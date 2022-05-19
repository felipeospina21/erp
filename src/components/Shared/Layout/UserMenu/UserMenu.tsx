import React from 'react';
import { Avatar, Flex, Menu, MenuList, MenuItem, Button } from '@chakra-ui/react';
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
    <Flex align="center" justify="space-between" wrap="wrap" w="12rem" p="0 0.5rem">
      <Avatar size="sm" name={`${firstName} ${lastName}`} src={image} />
      <Menu>
        <Button
          id="user-menu-btn"
          rightIcon={<DownArrow />}
          variant="ghost"
          p="0 0.3rem"
          fontSize="0.8rem"
          color="brand.grey.200"
          _hover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          _active={{ backgroundColor: 'none' }}
        >
          {email}
        </Button>
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
