import React, { useState, useRef } from "react";
import LoadingOverlay from "react-loading-overlay";
import Modal from "../utils/Modal";
// import Login from "./LoginBkp";

function Test(props) {
  const [showLoader, setShow] = useState(false);
  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  return (
    <>
      <a>Log In</a>
      {/* <LoadingOverlay
        active={showLoader}
        spinner
        text="Loading your content..."
      >
        <p>Some content or children or something.</p>
      </LoadingOverlay> */}

      <button onClick={openModal}>Open Modal</button>

      <Modal ref={modalRef}>
        {/* <Login /> */}
        <h1>Modal Header</h1>
        <p>
          dasd asdasdasddasd asdasdasddasd asdasdasddasd asdasdasddasd asdasdasd
          dasd asdasdasd dasd asdasdasd dasd asdasdasd dasd asdasdasd dasd
          asdasdasd dasd asdasdasddasd asdasdasd dasd asdasdasd
        </p>
      </Modal>
    </>
  );
}

export default Test;
