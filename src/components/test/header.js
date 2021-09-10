import React, { useState } from "react";
import Signin from "../pages/SigninLogIn/Signin";

import { BrowserRouter as Router, Link } from "react-router-dom";

function Header(props) {
  if (
    localStorage.getItem("ACCESS_TOKEN") == undefined ||
    localStorage.getItem("ACCESS_TOKEN") == ""
  ) {
    var mainHeader = (
      <nav id="navigation">
        <ul id="responsive">
          <li>
            {/* <a
              href="postProject"
              style={{ color: "#fff" }}
              className="button ripple-effect"
            >
              Post a Project
            </a> */}

            <Link
              to="/postProject"
              className="button ripple-effect"
              style={{ color: "#fff" }}
            >
              Post a Project
            </Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
            {/* <a href="/about">About Us</a> */}
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/how-it-works">How It Works</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
        </ul>
      </nav>
    );
  }
  return (
    <div>
      {/* Header Container================================================== */}
      <header id="header-container">
        {/* Header */}
        <div id="header">
          <div className="container">
            {/* Left Side Content */}
            <div className="left-side">
              {/* Logo */}
              <div id="logo">
                <Link to="/">
                  <img src="/images/at-logo.png" alt="" />
                </Link>
              </div>
              {/* Main Navigation */}
              {mainHeader}
              <div className="clearfix" />
              {/* Main Navigation / End */}
            </div>
            {/* Left Side Content / End */}
            {/* Right Side Content / End */}
            <div className="right-side">
              <Signin />
              {/* Mobile Navigation button */}
            </div>
            {/* Right Side Content / End */}
          </div>
        </div>
        {/* Header / End */}
      </header>
      <div className="clearfix" />
    </div>
  );
}

export default Header;
