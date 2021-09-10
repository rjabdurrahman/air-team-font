import React, { useState, useRef } from "react";
import Modal from "../../utils/Modal";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Register from "./Register";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Login from "./Login";
import Verifyemail from "./Verifyemail";
import ForgotPassword from "./ForgotPassword";
import UserNavbar from "../../components/user/UserNavbar";

import { checkAuth, logout } from "../../_services/checkAuth";

export default function Signin(props) {
  // var user = checkAuth("Creator");

  //   console.log();
  const modalSignRef = useRef();
  const modalRegRef = useRef();
  const modalVERef = useRef();
  const modalFPRef = useRef();

  const [error, setError] = useState();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    isCompany: ""
  });

  //sign Only
  const openSingModal = () => {
    if (modalRegRef.current != undefined) modalRegRef.current.close(); // reg
    if (modalVERef.current != undefined) modalVERef.current.close(); // verify email
    if (modalSignRef.current != undefined) modalSignRef.current.open(); // sign In
    if (modalFPRef.current != undefined) modalFPRef.current.close(); // forgot password
  };
  const closeSignModal = () => {
    if (modalSignRef.current != undefined) modalSignRef.current.close();
  };

  //reg only
  const openRegModal = () => {
    if (modalVERef.current != undefined) modalVERef.current.close(); // verify email
    if (modalSignRef.current != undefined) modalSignRef.current.close(); // sign
    if (modalFPRef.current != undefined) modalFPRef.current.close(); // forgot password
    if (modalRegRef.current != undefined) modalRegRef.current.open(); // reg
  };
  const closeRegModal = () => {
    if (modalRegRef.current != undefined) modalRegRef.current.close(); // reg
  };

  //Verify Email Modal
  const openVEModal = () => {
    if (modalRegRef.current != undefined) modalRegRef.current.close(); // reg
    if (modalSignRef.current != undefined) modalSignRef.current.close(); // sign  };
    if (modalFPRef.current != undefined) modalFPRef.current.close(); // forgot password
    if (modalVERef.current != undefined) modalVERef.current.open(); // verify email
  };
  const closeVEModal = () => {
    if (modalVERef.current != undefined) modalVERef.current.close();
  };

  //Forgot Password Modal
  const openFPModal = () => {
    if (modalRegRef.current != undefined) modalRegRef.current.close(); // reg
    if (modalVERef.current != undefined) modalVERef.current.close(); // verify email
    if (modalSignRef.current != undefined) modalSignRef.current.close(); // sign  };
    if (modalFPRef.current != undefined) modalFPRef.current.open(); // forgot password
  };
  const closeFPModal = () => {
    if (modalVERef.current != undefined) modalVERef.current.close();
  };

  const openVerifyEmail = newState => {
    setState(newState);
    openVEModal();
  };

  const errorData = newError => {
    setError({ error: newError });
  };

  // console.log("user", user);
  if (localStorage.getItem("ACCESS_TOKEN")) {
    return (
      <>
        <UserNavbar />
      </>
    );
  } else {
    return (
      <>
        <style>
          {
            ".modal-box{padding:10px 30px !important} .submit-field{margin-bottom:10px}"
          }
        </style>
        <div class="nav_ligin ">
          <nav id="navigation">
            <ul id="responsive">
              <li>
                <a id="loginID" onClick={openSingModal}>
                  Log In
                </a>
              </li>
              <li>
                <a
                  id="registerID"
                  // style={{ borderRadius: "5px", border: "1px solid #ccc" }}
                  onClick={openRegModal}
                  className="button gray ripple-effect"
                >
                  Join as a Freelancer
                </a>
              </li>
            </ul>
          </nav>

          <Modal ref={modalSignRef}>
            <Login
              state={state}
              modalFPRef={modalFPRef}
              modalSignRef={modalSignRef}
            />
            <p
              style={{
                textAlign: "left",
                color: "#979797",
                paddingBottom: "10px"
              }}
            >
              Dont have an account?{" "}
              <b
                onClick={openRegModal}
                style={{ color: "#3a3a3c", fontWeight: 500 }}
              >
                {" "}
                Sign Up
              </b>
            </p>
          </Modal>
          {/* Register Modal */}
          <Modal ref={modalRegRef}>
            <Register
              state={state}
              error={error}
              modalRegRef={modalRegRef}
              handleData={openVerifyEmail}
              errorData={errorData}
            />
            <p style={{ textAlign: "center", color: "#ccc" }}>
              Already a member?{" "}
              <b
                onClick={openSingModal}
                style={{ color: "#333", fontWeight: 500 }}
              >
                Sign In
              </b>
            </p>
          </Modal>
          <Modal ref={modalVERef}>
            <Verifyemail state={state} />

            <p style={{ textAlign: "center", color: "#ccc" }}>
              Already a member?{" "}
              <b
                onClick={openSingModal}
                style={{ color: "#333", fontWeight: 500 }}
              >
                Sign In
              </b>
            </p>
          </Modal>
          <Modal ref={modalFPRef}>
            <ForgotPassword />
          </Modal>
          <span className="mmenu-trigger">
            <button className="hamburger hamburger--collapse" type="button">
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </span>
        </div>
      </>
    );
  }
}
