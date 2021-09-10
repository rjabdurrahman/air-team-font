import React from "react";

function Settings(props) {
  return (
    <>
      <div className="dashboard-headline">
        <h3>Settings</h3>
      </div>

      <div>
        {/* Dashboard Box */}
        <div className="col-xl-12">
          <div id="test1" className="dashboard-box">
            {/* Headline */}
            <div className="headline">
              <h3>
                <i className="icon-material-outline-lock" /> Password &amp;
                Security
              </h3>
            </div>
            <div className="content with-padding">
              <div className="row">
                <div className="col-xl-4">
                  <div className="submit-field">
                    <h5>Current Password</h5>
                    <input type="password" className="with-border" />
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="submit-field">
                    <h5>New Password</h5>
                    <input type="password" className="with-border" />
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="submit-field">
                    <h5>Repeat New Password</h5>
                    <input type="password" className="with-border" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Button */}
        <div className="col-xl-12">
          <a href="#" className="button ripple-effect big margin-top-30">
            Save Changes
          </a>
        </div>
      </div>
    </>
  );
}

export default Settings;
