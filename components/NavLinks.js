import React from "react";
import Link from "next/link";
import {
  List,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";

const NavLinks = () => {
  return (
    <List spacing={3}>
      <StyledLink href='/' text='Home' />
      <StyledLink href='/ventas' text='Ventas' />
      <StyledLink href='/costos' text='Costos' />
      <StyledLink href='/mp' text='Materias Primas' />
    </List>
  );
};

export default NavLinks;

const StyledLink = props => (
  <ListItem>
    <ChakraLink color='teal'>
      <Link href={props.href}>{props.text}</Link>
    </ChakraLink>
  </ListItem>
);
