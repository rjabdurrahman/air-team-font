import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Sidebar from "./Sidebar";
import ErrorNotifications from "./ErrorNotifications";
import { Route, useRouteMatch, useLocation } from "react-router-dom";
import RendorBody from "./RendorBody";
import Home from "../../pages/Creator/Home";

import { checkAuth, logout } from "../../_services/checkAuth";

// import { UserContext } from "../../_hooks/UserContext";
var user;
function CreatorDash(props) {
  const { url, path } = useRouteMatch();
  const location = useLocation();
  user = checkAuth("Creator");
  // useEffect(() => {}, []);

  if (localStorage.getItem("ACCESS_TOKEN") || user) {
    console.log("user", user);
    if (user && user.user_role !== "Creator") {
      logout();
      window.location.href = "/";
    }
    return (
      <>
        <div>
          {/* Dashboard Container */}
          <div className="dashboard-container">
            {/* Dashboard Sidebar */}
            <Sidebar />
            {/* Dashboard Sidebar */}

            {/* Dashboard Content */}
            <div className="dashboard-content-container" data-simplebar>
              <div className="dashboard-content-inner">
                <ErrorNotifications />
                {/* Dashboard Headline */}
                {location.pathname !== "/creator-dash" ? (
                  // <Route path={`${path}/:page`} component={RendorBody} user />

                  <Route
                    path={`${path}/:page`}
                    render={() => <RendorBody user={user} />}
                  />
                ) : (
                  <Home />
                )}
              </div>
            </div>

            {/* Dashboard Content / End */}
          </div>
          {/* Dashboard Container / End */}
          {/* Wrapper / End */}
        </div>
      </>
    );
  } else {
    NotificationManager.error(
      "Login session expired, Login to continue ",
      "Error !!!"
    );
    logout();
    return <Redirect to="/" />;
  }
}

export default CreatorDash;
