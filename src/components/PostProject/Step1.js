/* eslint-disabled */
import React, { useEffect, useRef } from "react";
import Modal from "../../utils/Modal";
import "./style.css";

// function Step1(props) {
const Step1 = ({ setForm, formData, navigation }) => {
  const { next } = navigation;
  const mdlConfidentiality = useRef();

  const openConfMdl = () => {
    if (mdlConfidentiality.current != undefined)
      mdlConfidentiality.current.open();
  };

  const closeConfMdl = () => {
    if (mdlConfidentiality.current != undefined)
      mdlConfidentiality.current.close();
  };

  useEffect(() => {
    document.getElementById("header-container").style.display = "none";
    document.getElementById("footer").style.display = "none";

    openConfMdl();

    return () => {
      document.getElementById("header-container").style.display = "";
      document.getElementById("footer").style.display = "";
    };
  }, []);

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        next();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
      <style>
        {
          "\
          .modal-box { max-width: 358px !important;text-align:center;cursor:pointer}\
        "
        }
      </style>

      <div className="section" style={{ margin: "100px auto" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-md-8 offset-md-2">
              <img src={`/images/small-logo.png`} className="watermark-top" />
              <img
                src={`/images/small-logo.png`}
                className="watermark-bottom"
              />
              <div className="">
                <img src={`/images/small-logo.png`} style={{ width: "75px" }} />
                <h1 style={{ fontSize: "48px", color: "#2e3a59" }}>
                  Your <b style={{ color: "#5dbbc7" }}>team</b> is waiting
                </h1>

                <h5 style={{ fontSize: "16px", color: "#3a3a3c !important" }}>
                  Help the Account Director get the skill sets best suited to
                  your project by giving some project details
                </h5>
              </div>

              <div className="section-headline  margin-top-20">
                <a className="button airteam_btn_dark_color" onClick={next}>
                  Proceed
                </a>
                <a className="button press-Enter text-style-1">
                  press <b>Enter</b>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal ref={mdlConfidentiality}>
        <i
          className="icon-line-awesome-close"
          onClick={closeConfMdl}
          style={{ float: "right", color: "#666", fontWeight: 600 }}
        ></i>
        <div
          className="categories-container margin-bottom-15 margin-top-50"
          style={{ display: "block" }}
        >
          <img src="images/icons/shield.png" />

          <h5
            className="margin-top-10"
            style={{ fontWeight: 600, lineHeight: 1.45, fontSize: "22px" }}
          >
            Confidentiality
          </h5>
          <p
            style={{ fontSize: "14px", lineHeight: 1.43, fontWeight: "normal" }}
          >
            We understand privacy is important to you and maintaining the
            confidentiality of your data is our priority. Rest assured none of
            the project details entered will be saved until you log in to your
            Air Teams account. Once you log in, Your project details will remain
            confidential and secure on our servers.
          </p>

          <a
            className="margin-top-15 margin-bottom-15"
            href=""
            style={{
              display: "block",
              color: "#2dbdc9",
              textDecoration: "underline",
              lineHeight: "1.78",
              fontWeight: 500
            }}
          >
            Visit Privacy Page
          </a>

          <button
            className="button ripple-effect margin-top-10"
            style={{ width: "100%", fontSize: "16px", fontWeight: "600" }}
            onClick={closeConfMdl}
          >
            Got It
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Step1;
