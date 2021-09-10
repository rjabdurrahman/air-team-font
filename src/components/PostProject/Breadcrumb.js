import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ navigation, currentTab }) => {
  const { go } = navigation;

  useEffect(() => {
    document.getElementById("header-container").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("wrapper").style.paddingTop = "0";

    return () => {
      document.getElementById("header-container").style.display = "";
      document.getElementById("footer").style.display = "";
      document.getElementById("wrapper").style.paddingTop = "82px";
    };
  });

  return (
    <div className="section">
      <style>
        {
          "\
          .BoldBread {\
              font-weight: 600 !important;color:#333 !important\
          }\
          "
        }
      </style>
      <div className="container margin-top-15" style={{ display: "block" }}>
        <div className="row" style={{ borderBottom: "1px solid #e2f0f1" }}>
          <div className="col-xl-6 col-md-6 ">
            <nav id="breadcrumbs" style={{ background: "#fff" }}>
              <ul>
                <li>
                  <a
                    className={
                      currentTab == "step2"
                        ? "active"
                        : "" +
                          (currentTab == "step4" ||
                            currentTab == "step5" ||
                            currentTab == "step8")
                        ? "BoldBread"
                        : ""
                    }

                    //   onClick={() => go("Step2")}
                  >
                    Project Type
                  </a>
                </li>

                <li>
                  <a
                    className={
                      currentTab == "step4"
                        ? "active"
                        : "" + (currentTab == "step5" || currentTab == "step8")
                        ? "BoldBread"
                        : ""
                    }
                    //   onClick={() => go("Step4")}
                  >
                    Project Details
                  </a>
                </li>

                <li>
                  <a
                    className={
                      currentTab == "step5"
                        ? "active"
                        : "" + (currentTab == "step8")
                        ? "BoldBread"
                        : ""
                    }
                    //   onClick={() => go("Step5")}
                  >
                    Project Brief
                  </a>
                </li>

                <li>
                  <a
                    className={currentTab == "step8" ? "active" : ""}
                    //   onClick={() => go("Step8")}
                  >
                    Preview
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-xl-6 col-md-6 " style={{ textAlign: "right" }}>
            <Link
              to="/help"
              className="button gray ripple-effect-dark"
              style={{
                border: "1px solid #34c4c2",
                background: "#fff",
                padding: "5px 20px",
                textDecoration: "none",
                marginRight: "5px"
              }}
            >
              <i className="icon-material-outline-help-outline"></i> Help
            </Link>
            <Link
              to="/"
              className="button gray ripple-effect-dark"
              style={{
                border: "1px solid #34c4c2",
                background: "#fff",
                padding: "5px 20px",
                textDecoration: "none"
              }}
            >
              <i className="icon-line-awesome-home"></i> Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
