import React from "react";

function Footer(props) {
  return (
    <div id="footer" style={{ background: "#1a2440" }}>
      {/* Footer Middle Section */}
      <div className="footer-middle-section">
        <div className="container">
          <div className="row">
            {/* Links */}
            <div className="col-xl-2 col-lg-2 col-md-3">
              <div className="footer-links">
                <h3>Discover</h3>
                <ul>
                  <li>
                    <a href="#">
                      <span>How It Works</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>Blog</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>FAQ</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Links */}
            <div className="col-xl-2 col-lg-2 col-md-3">
              <div className="footer-links">
                <h3>Company</h3>
                <ul>
                  <li>
                    <a href="#">
                      <span>About Us</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>Careers</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>Contact Us</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Links */}
            <div className="col-xl-2 col-lg-2 col-md-3">
              <div className="footer-links">
                <h3>Members</h3>
                <ul>
                  <li>
                    <a href="#">
                      <span>Post a Project</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>Join as a Freelancer</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>Support Center</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Links */}
            <div className="col-xl-2 col-lg-2 col-md-3">
              <div className="footer-links">
                <h3>Account</h3>
                <ul>
                  <li>
                    <a href="#">
                      <span>Log In</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>My Account</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Newsletter */}
            <div className="col-xl-4 col-lg-4 col-md-12">
              <h3>
                <i className="icon-feather-mail" /> Sign Up For a Newsletter
              </h3>
              <p>
                Weekly breaking news, analysis and cutting edge advices on job
                searching.
              </p>
              <form action="#" method="get" className="newsletter">
                <input
                  type="text"
                  name="fname"
                  placeholder="Enter your email address"
                />
                <button
                  type="submit"
                  style={{
                    height: "42px",
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                    marginLeft: "-5px"
                  }}
                >
                  <i className="icon-feather-arrow-right" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Middle Section / End */}
      {/* Footer Copyrights */}
      <div className="footer-bottom-section">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-12"
              style={{ textAlign: "center", color: "#fff" }}
            >
              © 2021 <strong style={{ color: "#fff" }}>The Air Team</strong>.
              All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
      {/* Footer Copyrights / End */}
    </div>
  );
}

export default Footer;
