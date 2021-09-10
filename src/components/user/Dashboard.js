import React from "react";
import { NotificationManager } from "react-notifications";

function Dashboard(props) {
  console.log(props);
  // props.showError("Username and password do not match");
  var errorNotification = "";
  if (localStorage.getItem("ERROR_MSG")) {
    errorNotification = (
      <>
        <div className="col-md-12">
          <div
            className={`notification ${localStorage.getItem(
              "ERROR_CLS"
            )} closeable no-shadow`}
          >
            <p>{localStorage.getItem("ERROR_MSG")}</p>
            <a className="close" />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        {/* Dashboard Container */}
        <div className="dashboard-container">
          {/* Dashboard Sidebar
	================================================== */}
          <div className="dashboard-sidebar">
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
                    <ul data-submenu-title="Start">
                      <li>
                        <a href="dashboard.html">
                          <i className="icon-material-outline-dashboard" />{" "}
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="dashboard-messages.html">
                          <i className="icon-material-outline-question-answer" />{" "}
                          Messages <span className="nav-tag">2</span>
                        </a>
                      </li>
                      <li className="active">
                        <a href="dashboard-bookmarks.html">
                          <i className="icon-material-outline-star-border" />{" "}
                          Bookmarks
                        </a>
                      </li>
                      <li>
                        <a href="dashboard-reviews.html">
                          <i className="icon-material-outline-rate-review" />{" "}
                          Reviews
                        </a>
                      </li>
                    </ul>
                    <ul data-submenu-title="Organize and Manage">
                      <li>
                        <a href="#">
                          <i className="icon-material-outline-business-center" />{" "}
                          Projects
                        </a>
                        <ul>
                          <li>
                            <a href="dashboard-manage-jobs.html">
                              Manage Projects <span className="nav-tag">3</span>
                            </a>
                          </li>
                          <li>
                            <a href="dashboard-manage-candidates.html">
                              Manage Projects
                            </a>
                          </li>
                          <li>
                            <a href="dashboard-post-a-job.html">Post a Job</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-material-outline-assignment" />{" "}
                          Tasks
                        </a>
                        <ul>
                          <li>
                            <a href="dashboard-manage-tasks.html">
                              Manage Tasks <span className="nav-tag">2</span>
                            </a>
                          </li>
                          <li>
                            <a href="dashboard-manage-bidders.html">
                              Manage Bidders
                            </a>
                          </li>
                          <li>
                            <a href="dashboard-my-active-bids.html">
                              My Active Bids <span className="nav-tag">4</span>
                            </a>
                          </li>
                          <li>
                            <a href="dashboard-post-a-task.html">Post a Task</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul data-submenu-title="Account">
                      <li>
                        <a href="dashboard-settings.html">
                          <i className="icon-material-outline-settings" />{" "}
                          Settings
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
                {/* Navigation / End */}
              </div>
            </div>
          </div>
          {/* Dashboard Sidebar / End */}
          {/* Dashboard Content
	================================================== */}
          <div className="dashboard-content-container" data-simplebar>
            <div className="dashboard-content-inner">
              {/* Dashboard Headline */}
              <div className="dashboard-headline">{/* Breadcrumbs */}</div>
              {/* Row */}
              <div className="row">
                {/* Dashboard Box */}
                {errorNotification}

                <div className="col-xl-12">
                  <div className="dashboard-box margin-top-0">
                    {/* Headline */}

                    <div className="headline">
                      <h3>
                        <i className="icon-material-outline-business-center" />{" "}
                        New Projects
                      </h3>
                    </div>
                    <div className="content"></div>
                  </div>
                </div>
                {/* Dashboard Box */}
                <div className="col-xl-12">
                  <div className="dashboard-box">
                    {/* Headline */}
                    <div className="headline">
                      <h3>
                        <i className="icon-material-outline-face" /> Completed
                        Projects
                      </h3>
                    </div>
                    <div className="content">
                      <ul className="dashboard-box-list">
                        <li>
                          {/* Overview */}
                          <div className="freelancer-overview">
                            <div className="freelancer-overview-inner">
                              {/* Avatar */}
                              <div className="freelancer-avatar">
                                <div className="verified-badge" />
                                <a href="#">
                                  <img
                                    src="images/user-avatar-big-02.jpg"
                                    alt=""
                                  />
                                </a>
                              </div>
                              {/* Name */}
                              <div className="freelancer-name">
                                <h4>
                                  <a href="#">
                                    Website Development{" "}
                                    <img
                                      className="flag"
                                      src="images/flags/de.svg"
                                      alt=""
                                      title="Germany"
                                      data-tippy-placement="top"
                                    />
                                  </a>
                                </h4>
                                <span>Graphic Design</span>
                                {/* Rating */}
                                <div className="freelancer-rating">
                                  <div
                                    className="star-rating"
                                    data-rating="4.2"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Buttons */}
                          <div className="buttons-to-right">
                            <a
                              href="#"
                              className="button red ripple-effect ico"
                              title="Remove"
                              data-tippy-placement="left"
                            >
                              <i className="icon-feather-trash-2" />
                            </a>
                          </div>
                        </li>
                        <li>
                          {/* Overview */}
                          <div className="freelancer-overview">
                            <div className="freelancer-overview-inner">
                              {/* Avatar */}
                              <div className="freelancer-avatar">
                                <a href="#">
                                  <img
                                    src="images/user-avatar-placeholder.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                              {/* Name */}
                              <div className="freelancer-name">
                                <h4>
                                  <a href="#">
                                    Website Development{" "}
                                    <img
                                      className="flag"
                                      src="images/flags/pl.svg"
                                      alt=""
                                      title="Poland"
                                      data-tippy-placement="top"
                                    />
                                  </a>
                                </h4>
                                <span>Front-End Developer</span>
                                {/* Rating */}
                                <div className="freelancer-rating">
                                  <div
                                    className="star-rating"
                                    data-rating="4.7"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Buttons */}
                          <div className="buttons-to-right">
                            <a
                              href="#"
                              className="button red ripple-effect ico"
                              title="Remove"
                              data-tippy-placement="left"
                            >
                              <i className="icon-feather-trash-2" />
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row / End */}
            </div>
          </div>
          {/* Dashboard Content / End */}
        </div>
        {/* Dashboard Container / End */}
        {/* Wrapper / End */}
        {/* Apply for a job popup
================================================== */}
        <div
          id="small-dialog"
          className="zoom-anim-dialog mfp-hide dialog-with-tabs"
        >
          {/*Tabs */}
          <div className="sign-in-form">
            <ul className="popup-tabs-nav">
              <li>
                <a href="#tab">Add Note</a>
              </li>
            </ul>
            <div className="popup-tabs-container">
              {/* Tab */}
              <div className="popup-tab-content" id="tab">
                {/* Welcome Text */}
                <div className="welcome-text">
                  <h3>Do Not Forget 😎</h3>
                </div>
                {/* Form */}
                <form method="post" id="add-note">
                  <select
                    className="selectpicker with-border default margin-bottom-20"
                    data-size={7}
                    title="Priority"
                  >
                    <option>Low Priority</option>
                    <option>Medium Priority</option>
                    <option>High Priority</option>
                  </select>
                  <textarea
                    name="textarea"
                    cols={10}
                    placeholder="Note"
                    className="with-border"
                    defaultValue={""}
                  />
                </form>
                {/* Button */}
                <button
                  className="button full-width button-sliding-icon ripple-effect"
                  type="submit"
                  form="add-note"
                >
                  Add Note{" "}
                  <i className="icon-material-outline-arrow-right-alt" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Apply for a job popup / End */}
      </div>
    </>
  );
}

export default Dashboard;
