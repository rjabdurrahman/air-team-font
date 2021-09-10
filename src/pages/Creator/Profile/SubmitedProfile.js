import React from "react";
import { Link } from "react-router-dom";

function SubmitedProfile(props) {
  return (
    <div className="section ">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="section-headline margin-top-0 margin-bottom-35">
              <h3>My Profile</h3>

              <Link to="/creator-dash" className="headline-link">
                Dashboard
              </Link>
              {/* <a
                href="/creator-dash"
                className="headline-link"
                style={{ position: "absolute", right: "0", bottom: "0" }}
              >
                <i className="icon-feather-edit"></i>
              </a> */}
            </div>

            <div
              className="tasks-list-container compact-list margin-top-35"
              style={{ borderLeft: "3px solid #54c4c3" }}
            >
              <a className="task-listing">
                {/* Job Listing Details */}
                <div className="task-listing-details">
                  {/* Details */}
                  <div className="task-listing-description">
                    <h3 className="task-listing-title">
                      Your profile has been submitted for review!
                    </h3>
                    <ul className="task-icons">
                      <li>
                        This is important for{" "}
                        <b>{process.env.REACT_APP_SITE_NAME}</b> to ensure the
                        authenticity of all members and ensure only ethical and
                        quality collaborations.
                      </li>
                      <li>
                        <p>
                          It usually take us <b>48 Hours</b> to complete the
                          review. We will notify you!
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="task-listing-bid">
                  <div className="task-listing-bid-inner">
                    <div
                      className="task-offers"
                      style={{ textAlign: "center" }}
                    >
                      <i
                        className="icon-feather-user-check"
                        style={{ fontSize: "110px", color: "#ccc" }}
                      />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitedProfile;
