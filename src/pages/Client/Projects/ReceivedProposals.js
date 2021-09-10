import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";

function ReceivedProposals(props) {
  const [loader, setLoader] = useState(false);
  const [projects, setProducts] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.user) {
      setLoader(true);
      axios
        .get(
          process.env.REACT_APP_API_BASE_URL +
            "/projects/proposals_projects/" +
            localStorage.getItem("USER_ID")
        )
        .then(res => {
          setLoader(false);
          if (res.data.status) {
            setProducts(res.data.result);
          } else {
            setErrors({ message: "You dont have any pending projects." });
          }
        })
        .catch(error => {
          setLoader(false);
          if (error.response != "undefined" && error.response) {
            if (error.response.status == 404) {
              NotificationManager.error(
                "Page not found, Please try again",
                "Error !!!"
              );
            } else if (error.response.data.errors.message.length) {
              setErrors({
                message: error.response.data.errors.message
              });

              NotificationManager.error(
                error.response.data.errors.message,
                error.response.data.errors.title
              );
            }
          }
        });
    }
  }, []);

  return (
    <LoadingOverlay active={loader} spinner text="Loading...">
      <div className="dashboard-content-container" data-simplebar>
        <div className="dashboard-content-inner" style={{ padding: 0 }}>
          <div className="row">
            {/* Dashboard Box */}
            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">
                {/* Headline */}
                <div className="headline">
                  <h3>
                    <i className="icon-material-outline-business-center" />
                    Proposals
                  </h3>
                </div>
                <div className="content" style={{ paddingBottom: "10px" }}>
                  {Object.entries(projects).length > 0 ? (
                    <ul className="dashboard-box-list">
                      {Object.entries(projects).map((project, index) => {
                        const postedDate = new Date(project[1].createdAt);

                        return (
                          <li key={index}>
                            {/* Job Listing */}
                            <div className="job-listing">
                              {/* Job Listing Details */}
                              <div className="job-listing-details">
                                <div className="job-listing-description">
                                  <h3 className="job-listing-title">
                                    <a
                                      href="/#"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {project[1].project_title}
                                    </a>{" "}
                                  </h3>
                                  {/* Job Listing Footer */}
                                  <div className="job-listing-footer">
                                    <ul>
                                      <li>
                                        <i className="icon-material-outline-date-range" />{" "}
                                        Posted on{" "}
                                        <b>{postedDate.toDateString()}</b>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Buttons */}
                            <div className="buttons-to-right always-visible">
                              {project[1].curated_proposals_count > 0 ? (
                                <Link
                                  to={`/client/project-proposals/project/${project[1]._id}`}
                                  className="button  ripple-effect ico"
                                  title="View"
                                  data-tippy-placement="top"
                                  style={{ color: "#fff", width: "200px" }}
                                >
                                  <b>{project[1].curated_proposals_count}</b>{" "}
                                  Proposal Received
                                </Link>
                              ) : (
                                <>
                                  <span
                                    className="button gray ripple-effect ico"
                                    title="View"
                                    data-tippy-placement="top"
                                    style={{
                                      width: "200px",
                                      textDecoration: "none"
                                    }}
                                  >
                                    <b>{project[1].curated_proposals_count}</b>{" "}
                                    Proposal Received
                                  </span>
                                </>
                              )}

                              {/* <a
                                className="button dark ripple-effect ico"
                                title="View"
                                data-tippy-placement="top"
                                style={{ color: "#fff", width: "200px" }}
                              >
                                <b>{project[1].curated_proposals_count}</b> Proposal
                                Received
                              </a> */}

                              {/* <a
                                href="#"
                                className="button dark ripple-effect ico"
                                title="Remove"
                                data-tippy-placement="top"
                              >
                                <i className="icon-feather-trash-2" />
                              </a> */}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div
                      className="notification error no-shadow"
                      style={{ margin: "10px 30px" }}
                    >
                      <p>{errors.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Row / End */}
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default ReceivedProposals;
