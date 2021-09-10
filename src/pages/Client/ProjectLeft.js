import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";

function Left(props) {
  const [project, setProject] = useState(props.project);

  var fromDate = "";
  var toDate = "";
  if (project.timeline === "Custom Dates") {
    fromDate = new Date(project.from_date);
    toDate = new Date(project.to_date);
  }
  // props.Loader(true);
  console.log("props.project", props.project);
  return (
    <>
      {/* Dashboard Sidebar */}
      <div className="dashboard-sidebaikr dashboard-sidebar-new ">
        <div className="dashboard-sidebar-inner" data-simplebar>
          <div className="dashboard-nav-container">
            {/* Responsive Navigation Trigger */}
            <a href="#" className="dashboard-responsive-nav-trigger">
              <span className="hamburger hamburger--collapse">
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </span>
              <span className="trigger-title">Dashboard Navigation</span>
            </a>
            {/* Navigation */}
            <div className="dashboard-nav">
              <div className="dashboard-nav-inner">
                <ul data-submenu-title="">
                  <li class="nav-dashboard">
                    <Link>
                      <div class="circle"></div>
                      <br></br>
                      <span style={{ textTransform: "capitalize" }}>
                        {project.project_title}
                      </span>
                      <p>{project.industry.name}</p>
                    </Link>
                  </li>
                </ul>
                <ul class="events">
                  <li>
                    <time></time>
                    <span>
                      <strong>Project Name</strong>
                      {project.project_title}
                    </span>
                  </li>

                  <li>
                    <time></time>
                    <span>
                      <strong>Skill Sets</strong>
                      {project.sub_category.map((skill, index) => {
                        console.log("skill", skill);
                        return (
                          <label
                            style={{
                              background: "rgba(42,65,232,0.07)",
                              color: "#54c4c3",
                              padding: "0px 10px",
                              border: "1px solid #efefef",
                              borderRadius: "5px",
                              marginRight: "5px",
                              fontSize: "12px",
                            }}
                            key={index}
                          >
                            {skill.name}
                          </label>
                        );
                      })}
                    </span>
                  </li>

                  <li>
                    <time></time>
                    <span>
                      <strong>Project Duration</strong>
                      {project.timeline === "Custom Dates" ? (
                        <>
                          {fromDate.toDateString()} - {toDate.toDateString()}
                        </>
                      ) : (
                        project.timeline
                      )}
                    </span>
                  </li>
                  <li>
                    <time></time>
                    <span class="last">
                      <strong>Project Budget</strong>
                      {project.budget}
                    </span>
                  </li>
                </ul>
                {/* <div class="report">
                  <a href="#">view Detailed report</a>
                </div> */}
              </div>
            </div>
            {/* Navigation / End */}
          </div>
        </div>
      </div>
      {/* Dashboard Sidebar / End */}

      {/* <div className="py-10">{element}</div> */}
      {/* {routeResult} */}
    </>
  );
}

export default Left;
