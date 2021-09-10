/* eslint-disabled */
import React, { useEffect, useRef } from "react";
import Modal from "../../utils/Modal";
import "./style.css";

// function Step1(props) {
const Step1 = ({ setForm, formData, navigation }) => {
  const { next } = navigation;

  useEffect(() => {
    document.getElementById("header-container").style.display = "none";
    document.getElementById("footer").style.display = "none";

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
    </>
  );
};

export default Step1;
