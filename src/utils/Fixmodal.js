import react, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

const Fixmodal = forwardRef((props, ref) => {
  // console.log("----props----", props);
  const [display, setDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      testmode: () => console.log("Testing"),
      openModal: () => open(),
      open: () => open(),
      close: () => close()
    };
  });
  const open = () => {
    setDisplay(false);
    setDisplay(true);
  };
  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <CSSTransition in={display} timeout={300} classNames="dialog">
        <div className="modal-wrapper">
          <div className="modal-backdrop" />
          <div className="modal-box" style={{ padding: "10px 30px" }}>
            {props.children}
          </div>
        </div>
      </CSSTransition>,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
});

export default Fixmodal;
