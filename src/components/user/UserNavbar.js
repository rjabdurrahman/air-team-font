import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../_hooks/UserContext";

function UserHeader(props) {
  const logged_user = useContext(UserContext);
  const [user, setUser] = useState({});
  // console.log("logged_user", logged_user);
  console.log("user", user);

  useEffect(() => {
    if (logged_user.user) setUser(logged_user.user);
    // console.log("user", user);
  }, [logged_user]);

  function handleLogout() {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("USER_ID");
    window.location = "/";
  }
  console.log(
    "user.length > 0 && user.user_role",
    Object.entries(user).length,
    user.user_role
  );

  return (
    <>
      <div>
        <nav id="navigation">
          <ul id="responsive">
            <li>
              {Object.entries(user).length > 0 && user.user_role == "Client" ? (
                <Link to="/client-dash">Dashboard </Link>
              ) : (
                <></>
              )}
              {Object.entries(user).length > 0 &&
              user.user_role == "Creator" ? (
                <Link to="/creator-dash">Dashboard </Link>
              ) : (
                <></>
              )}
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
            <li>
              {Object.entries(user).length > 0 && user.user_role == "Client" ? (
                <Link to="/client-dash/messages">
                  <i
                    style={{ fontSize: "26px" }}
                    className="icon-feather-mail"
                  />
                </Link>
              ) : (
                <Link to="/creator-dash/messages">
                  <i
                    style={{ fontSize: "26px" }}
                    className="icon-feather-mail"
                  />
                </Link>
              )}
            </li>
            {/* <li>
              <a onClick={handleLogout}>
                <i
                  style={{ fontSize: "26px" }}
                  className="icon-feather-log-out"
                />
              </a>
            </li> */}

            {Object.entries(user).length > 0 && user.user_role == "Client" ? (
              <li>
                <Link to="/postProject">
                  <button
                    style={{ marginTop: "-5px" }}
                    className="button ripple-effect"
                  >
                    Post a Project
                  </button>
                </Link>
              </li>
            ) : (
              <></>
            )}
          </ul>

          <div class="header-notifications user-menu">
            <div id="navigation" class="header-notifications-trigger">
              <a href="#">
                <div class="user-avatar status-online">
                  <img src="/images/user-avatar-small-01.jpg" alt="" />
                </div>
              </a>
            </div>
            <div class="header-notifications-dropdown">
              <div class="user-status" style={{ padding: "15px 25px" }}>
                <div class="user-details">
                  {Object.entries(user).length > 0 ? (
                    <div class="user-avatar status-online">
                      <img src="/images/user-avatar-small-01.jpg" alt="" />
                    </div>
                  ) : (
                    <div class="user-avatar status-online">
                      <img src="/images/user-avatar-small-01.jpg" alt="" />
                    </div>
                  )}

                  {Object.entries(user).length > 0 ? (
                    <div class="user-name">
                      <span>Welcome,</span>
                      <label
                        style={{
                          fontWeight: "600",
                          textTransform: "capitalize"
                        }}
                      >
                        {user.name}
                      </label>
                    </div>
                  ) : (
                    <div class="user-name">
                      <span>Welcome, </span>
                      <label
                        style={{
                          fontWeight: "600",
                          textTransform: "capitalize"
                        }}
                      >
                        {user.name}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <ul class="user-menu-small-nav" style={{ padding: "10px" }}>
                <li>
                  {Object.entries(user).length > 0 &&
                  user.user_role == "Client" ? (
                    <Link to="/client-dash">
                      <i class="icon-material-outline-dashboard"></i> Dashboard{" "}
                    </Link>
                  ) : (
                    <></>
                  )}
                  {Object.entries(user).length > 0 &&
                  user.user_role == "Creator" ? (
                    <Link to="/creator-dash">
                      <i class="icon-material-outline-dashboard"></i> Dashboard{" "}
                    </Link>
                  ) : (
                    <></>
                  )}
                </li>
                <li>
                  <a href="dashboard-settings.html">
                    <i class="icon-material-outline-settings"></i> Settings
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>
                    <i class="icon-material-outline-power-settings-new"></i>{" "}
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Button */}

        <span className="mmenu-trigger navbar-collapse1">
          <span className="hamburger hamburger--collapse">
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </span>
        </span>
      </div>
    </>
  );
}

export default UserHeader;
