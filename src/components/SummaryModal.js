import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

function SummaryModal({ isOpen, onClose, summary }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Summary</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{summary}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SummaryModal;
