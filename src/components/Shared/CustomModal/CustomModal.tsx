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
  IconButton,
} from '@chakra-ui/react';

export interface CustomModalProps {
  button: {
    icon?: JSX.Element;
    text?: string;
    bgColor?: string;
    variant?: string;
  };
  title: string;
  children: JSX.Element | JSX.Element[];
  isDisplayed?: boolean;
  setDisplayModal?: Dispatch<SetStateAction<boolean>>;
}
export function CustomModal({
  button,
  title,
  children,
  isDisplayed,
  setDisplayModal,
}: CustomModalProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleDisplay(): void {
    if (!setDisplayModal) return;
    setDisplayModal(!isDisplayed);
  }

  return (
    <>
      {button?.icon ? (
        <IconButton
          icon={button?.icon}
          onClick={setDisplayModal ? handleDisplay : onOpen}
          bgColor={button?.bgColor}
          aria-label={title}
        />
      ) : (
        <Button onClick={setDisplayModal ? handleDisplay : onOpen}>{button?.text}</Button>
      )}

      <Modal isOpen={isDisplayed ?? isOpen} onClose={setDisplayModal ? handleDisplay : onClose}>
        <ModalOverlay />
        <ModalContent py="2rem">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
