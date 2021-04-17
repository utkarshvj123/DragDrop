import React, { useState } from "react";
import "./style.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalWrapper({
  modalVisble,
  modalEventHandler,
  children,
  outerClick,
  onSubmit,
  heading,
  btnName,
  classNameBody,
}) {
  return (
    <>
      <Modal
        show={modalVisble}
        onHide={modalEventHandler}
        backdrop={outerClick}
      >
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classNameBody}>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSubmit}>
            {btnName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWrapper;

ModalWrapper.defaultProps = {};
