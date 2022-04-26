import React, { Dispatch, SetStateAction } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

export interface ModalContainerProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  isDisplayed?: boolean;
  setDisplayModal?: Dispatch<SetStateAction<boolean>>;
}
const ModalContainer = ({ title, children, isDisplayed, setDisplayModal }: ModalContainerProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleDisplay(): void {
    setDisplayModal(!isDisplayed);
  }
  return (
    <>
      <Button onClick={setDisplayModal ? handleDisplay : onOpen}>{title}</Button>

      <Modal isOpen={isDisplayed ?? isOpen} onClose={setDisplayModal ? handleDisplay : onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalContainer;
