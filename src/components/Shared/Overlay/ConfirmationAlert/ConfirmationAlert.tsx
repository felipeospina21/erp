import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogCloseButton,
} from '@chakra-ui/react';

export interface ConfirmationAlertProps {
  isOpen: boolean;
  header: string;
  body: string;
  button: JSX.Element;
  toggleDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConfirmationAlert({
  isOpen,
  header,
  body,
  button,
  toggleDisplay,
  setConfirmation,
}: ConfirmationAlertProps): JSX.Element {
  const cancelRef = React.useRef(null);

  function handleClose(): void {
    toggleDisplay(!isOpen);
  }

  function handleConfirmation(): void {
    setConfirmation(true);
    toggleDisplay(false);
  }
  return (
    <>
      {button}

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{body}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleConfirmation}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
