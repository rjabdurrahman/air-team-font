/* eslint-disabled */
import React, { useEffect, useRef } from "react";
import { css } from '@emotion/css'

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
      <div className="section" style={{ margin: "100px auto", height: 'calc(100vh - 200px)' }}>
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

                <h5 className={css`
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: normal;
                  font-size: 16px;
                  line-height: 28px;
                  text-align: justify;
                  letter-spacing: 0.444444px;
                  color: #6F87A0;
                `}>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  <div style={{height: '30px'}}></div>
                  To help us find you the perfect team, we need you to fill out some details about your project. Just press the start button to begin!
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
