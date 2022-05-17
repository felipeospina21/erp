import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { RiMenu2Line } from 'react-icons/ri';
import {
  Icon,
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import NavLinks from './NavLinks';
import { useLogoutMutation } from '@/redux/services';

export function SideNav(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logout] = useLogoutMutation();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [, currPage] = router.pathname.split('/');

  return (
    <Box p="1rem" bg={'brand.grey.600'}>
      <Flex align="center">
        <Button ref={btnRef} variant="solid" colorScheme="whiteAlpha" onClick={onOpen}>
          <Icon as={RiMenu2Line} />
        </Button>
        <Heading as="h1" size="xl" ml="40%" color="brand.grey.200" letterSpacing="5px">
          {currPage.toLocaleUpperCase()}
        </Heading>
        <Button onClick={() => logout()}>Logout</Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Módulos</DrawerHeader>

          <DrawerBody display="flex" flexDir="column">
            <NavLinks onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default SideNav;
