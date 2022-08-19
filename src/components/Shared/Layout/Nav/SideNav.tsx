import { useLogoutMutation } from '@/redux/services';
import { useGetSession } from 'hooks/useGetSession';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import NavLinks from './NavLinks/NavLinks';
import UserMenu from './UserMenu';

export function SideNav(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logout, { isSuccess }] = useLogoutMutation();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [, currPage] = router.pathname.split('/');
  const session = useGetSession();

  function handleLogout(): void {
    logout();
  }

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('userId');
      router.push('/login');
    }
  }, [isSuccess, router]);
  return (
    <Box p="1rem" bg={'custom.grey.600'} position="sticky" top={0} zIndex={2}>
      <Flex align="center" justify="space-between">
        <Box w="12rem">
          <IconButton
            aria-label="menu-button"
            icon={<RiMenu2Line />}
            ref={btnRef}
            variant="solid"
            colorScheme="whiteAlpha"
            onClick={onOpen}
          />
        </Box>
        <Heading
          as="h1"
          fontSize={['md', '2xl', '3xl']}
          color="custom.grey.200"
          letterSpacing="5px"
        >
          {currPage.toLocaleUpperCase()}
        </Heading>
        <UserMenu user={session.data} menuItemClickFn={{ handleLogout }} />
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
