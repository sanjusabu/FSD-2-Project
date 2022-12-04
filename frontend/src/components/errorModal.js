import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useState, useEffect } from "react";
const ErrorModal = (props) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(true);
  console.log(modalIsOpen);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  console.log(props.showmodal, "kjhjjnjjk");

  //   const openModal = () => {
  //     setIsOpen(true);
  //   };
  const closeModal = () => {
    setIsOpen(false);
  };
  Modal.setAppElement("#root");

  return (
    <>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>{props.error}</div>
          <button onClick={closeModal}>close</button>
        </Modal>
      )}
    </>
  );
};
export default ErrorModal;
