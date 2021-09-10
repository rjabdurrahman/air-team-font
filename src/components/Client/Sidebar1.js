import React from "react";
import "./style.css";
import { Link, Route, useRouteMatch } from "react-router-dom";

function Sidebar(props) {
  // const routeResult = useRoutes(routes);
  const { url, path } = useRouteMatch();

  return (
    <>
      {/* Dashboard Sidebar */}
      <div className="dashboard-sidebar dashboard-sidebar-new ">
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
                      <span>Main Website Revamp</span>
                      <p>website creation</p>
                    </Link>
                  </li>
                </ul>
                <ul class="events">
                  <li>
                    <time></time>
                    <span>
                      <strong>Project Name</strong>Main Website Revamp
                    </span>
                  </li>

                  <li>
                    <time></time>
                    <span>
                      <strong>Skill Sets</strong>Rect Js HTML, CSS
                    </span>
                  </li>

                  <li>
                    <time></time>
                    <span>
                      <strong>Project Duration</strong> 15 sep to 2 oct, 2020
                    </span>
                  </li>
                  <li>
                    <time></time>
                    <span class="last">
                      <strong>Project Budget</strong>Medium Project
                    </span>
                  </li>
                </ul>
                <div class="report">
                  <a href="#">view Detailed report</a>
                </div>
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

export default Sidebar;
