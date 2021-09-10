import React from "react";

function UserDropdown(props) {
  return (
    <>
      <div className="header-notifications user-menu">
        <div className="header-notifications-trigger">
          <a href="#">
            <div className="user-avatar status-online">
              <img src="images/user-avatar-small-01.jpg" alt="" />
            </div>
          </a>
        </div>
        {/* Dropdown */}
        <div className="header-notifications-dropdown">
          {/* User Status */}
          <div className="user-status">
            {/* User Name / Avatar */}
            <div className="user-details">
              <div className="user-avatar status-online">
                <img src="/images/user-avatar-small-01.jpg" alt="" />
              </div>
              <div className="user-name">
                Tom Smith <span>Freelancer</span>
              </div>
            </div>
            {/* User Status Switcher */}
            <div className="status-switch" id="snackbar-user-status">
              <label className="user-online current-status">Online</label>
              <label className="user-invisible">Invisible</label>
              {/* Status Indicator */}
              <span className="status-indicator" aria-hidden="true" />
            </div>
          </div>
          <ul className="user-menu-small-nav">
            <li>
              <a href="dashboard.html">
                <i className="icon-material-outline-dashboard" /> Dashboard
              </a>
            </li>
            <li>
              <a href="dashboard-settings.html">
                <i className="icon-material-outline-settings" /> Settings
              </a>
            </li>
            <li>
              <a href="index-logged-out.html">
                <i className="icon-material-outline-power-settings-new" />{" "}
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserDropdown;
