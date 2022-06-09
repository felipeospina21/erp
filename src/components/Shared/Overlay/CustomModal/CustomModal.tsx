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
import { Sizes, ButtonVariants } from '@/styles/types';

export interface CustomModalProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  button?: {
    text?: string;
    size?: Sizes;
    variant?: ButtonVariants;
  };
  iconButton?: JSX.Element;
  isDisplayed?: boolean;
  setDisplayModal?: Dispatch<SetStateAction<boolean>>;
}
export function CustomModal({
  button,
  iconButton,
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
      {!!iconButton ? (
        iconButton
      ) : (
        <Button
          size={button?.size}
          variant={button?.variant}
          onClick={setDisplayModal ? handleDisplay : onOpen}
        >
          {button?.text}
        </Button>
      )}

      <Modal
        scrollBehavior="inside"
        size="xl"
        isOpen={isDisplayed ?? isOpen}
        onClose={setDisplayModal ? handleDisplay : onClose}
      >
        <ModalOverlay />
        <ModalContent py="2rem" data-testid="custom-modal">
          <ModalHeader py="0">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="white">{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
