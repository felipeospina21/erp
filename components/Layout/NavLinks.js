import React from "react";
import NextLink from "next/link";
import { List, ListItem, Box } from "@chakra-ui/react";

const NavLinks = ({ onClose }) => {
  return (
    <List spacing={3}>
      <StyledLink href='/' text='Home' onClose={onClose} />
      <StyledLink href='/ventas' text='Ventas' onClose={onClose} />
      <StyledLink href='/clientes' text='Clientes' onClose={onClose} />
      <StyledLink href='/costos' text='Costos' onClose={onClose} />
    </List>
  );
};

export default NavLinks;

// MyButton allows closing menu when clicking link
const MyButton = React.forwardRef(({ onClick, href, text }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      {text}
    </a>
  );
});
MyButton.displayName = "MyButton";

const StyledLink = props => (
  <ListItem>
    <NextLink href={props.href} passHref>
      <Box color='teal' as='button' _hover={{ textDecor: "underline" }}>
        <MyButton text={props.text} onClick={props.onClose} />
      </Box>
    </NextLink>
  </ListItem>
);
