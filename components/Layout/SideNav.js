import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { RiMenu2Line } from "react-icons/ri";
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
} from "@chakra-ui/react";
import NavLinks from "./NavLinks";

const SideNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box m='1rem'>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        <Icon as={RiMenu2Line} />
      </Button>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Módulos</DrawerHeader>

          <DrawerBody display='flex' flexDir='column'>
            <NavLinks onClose={onClose}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SideNav;
