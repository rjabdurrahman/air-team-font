import React, { useState, useEffect } from "react";
import axios from "axios";
import SubmitedProfile from "../../../pages/Creator/Profile/SubmitedProfile";

const Welcome = ({ setForm, formData, navigation }) => {
  const { next } = navigation;
  const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_BASE_URL +
          "/users/" +
          localStorage.getItem("USER_ID")
      )
      .then(res => {
        const UserDetails = res.data.profile_status;
        if (UserDetails.is_profile_submitted == 1) {
          setIsProfileSubmitted(true);
        }
      });
  }, []);

  if (!isProfileSubmitted) {
    return (
      <>
        <div className="section margin-top-65">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-md-12">
                <div className="section-headline centered margin-bottom-15">
                  <h2>
                    <b>Complete your profile to get verified</b>
                    <br />
                    <br />
                    <p
                      style={{
                        color: "#888 !important",
                        width: "70%",
                        margin: "0 auto"
                      }}
                    >
                      If you sign up today, you will be part of{" "}
                      <b>{process.env.REACT_APP_SITE_NAME}</b> Priority Listing
                      (Comprising the first 1000 freelancers), which will make
                      you a preferred partner for premium gigs in your domain.
                    </p>
                  </h2>
                </div>
                <div className="section-headline centered margin-top-65">
                  <a
                    onClick={next}
                    className="button dark ripple-effect button-sliding-icon"
                    style={{ width: "155.406px" }}
                  >
                    Let's Go <i className="icon-feather-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <SubmitedProfile />;
  }
};

export default Welcome;
