import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';

export interface InvoiceModalProps {
  isDisplayed: boolean;
  setDisplayModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: JSX.Element | JSX.Element[];
}

export default function InvoiceModal({
  isDisplayed,
  setDisplayModal,
  title,
  children,
}: InvoiceModalProps): JSX.Element {
  const { isOpen } = useDisclosure();
  function handleDisplay(): void {
    if (!setDisplayModal) return;
    setDisplayModal(!isDisplayed);
  }
  return (
    <Modal scrollBehavior="inside" size="xl" isOpen={isDisplayed ?? isOpen} onClose={handleDisplay}>
      <ModalOverlay />
      <ModalContent py="2rem" data-testid="custom-modal">
        <ModalHeader py="0">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor="white">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
