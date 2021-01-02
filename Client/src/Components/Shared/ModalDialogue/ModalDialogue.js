import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalDialogue = ({
  show,
  closeDialogue,
  title,
  children,
  successCallback,
  successButtonText = "Ok",
  closeButtonText = "Cancel",
  showSuccessButton = true,
  showCancelButton = true,
  size = null,
  widthClass,
}) => {
  return (
    <Modal
      show={show}
      onHide={closeDialogue}
      scrollable={true}
      size={size}
      dialogClassName={widthClass}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalDialogue;
