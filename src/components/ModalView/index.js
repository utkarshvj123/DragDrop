import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "./style.css";
import PropTypes from "prop-types";

function ModalView(props) {
  const { visibility, onHide, ariaLabelledby, header, children,size } = props;
  return (
    <Modal
      show={visibility}
      size={size}
      onHide={onHide}
      aria-labelledby={ariaLabelledby}
      centered
    >
      <ModalHeader closeButton={true}>
        <ModalTitle>{header}</ModalTitle>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}

export default ModalView;

ModalView.defaultProps = {
  modalVisibilityFunc: () => {},
  array: [{}],
  show: false,
  buttonVisiblity: false,
  size: "lg",
  closeButton: true,
  onHide: () => {},
  ariaLabelledby: "",
  header: "",
};

ModalView.propTypes = {
  modalVisibilityFunc: PropTypes.func,
  array: PropTypes.array,
  show: PropTypes.bool,
  buttonVisiblity: PropTypes.bool,
  size: PropTypes.string,
  closeButton: PropTypes.bool,
  onHide: PropTypes.func,
  ariaLabelledby: PropTypes.string,
  header: PropTypes.string,
};
