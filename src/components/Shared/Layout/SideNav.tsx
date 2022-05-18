import React, { useEffect } from 'react';
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
  const [logout, { isSuccess }] = useLogoutMutation();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [, currPage] = router.pathname.split('/');

  function handleLogout(): void {
    logout();
  }

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);
  return (
    <Box p="1rem" bg={'brand.grey.600'}>
      <Flex align="center">
        <Button ref={btnRef} variant="solid" colorScheme="whiteAlpha" onClick={onOpen}>
          <Icon as={RiMenu2Line} />
        </Button>
        <Heading as="h1" size="xl" ml="40%" color="brand.grey.200" letterSpacing="5px">
          {currPage.toLocaleUpperCase()}
        </Heading>
        <Flex align="center" justify="space-between" w="30%">
          <Box fontSize="0.8rem" color="brand.grey.200">
            hardcoded@email.com
          </Box>
          <Button size="xs" variant="solid" bgColor="brand.grey.200" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
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
