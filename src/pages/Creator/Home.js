import React from "react";
import jwt_decode from "jwt-decode";

function Home(props) {
  var userData = jwt_decode(localStorage.getItem("ACCESS_TOKEN"));
  return (
    <>
      <div className="dashboard-headline">
        <h3>Welcome, {userData.name}!</h3>
        <span>We are glad to see you again!</span>
      </div>

      <div className="fun-facts-container">
        <div className="fun-fact" data-fun-fact-color="#36bd78">
          <div className="fun-fact-text">
            <span>Ongoing Projects</span>
            <h4>4</h4>
          </div>
          <div className="fun-fact-icon">
            <i className="icon-material-outline-gavel" />
          </div>
        </div>
        <div className="fun-fact" data-fun-fact-color="#b81b7f">
          <div className="fun-fact-text">
            <span>Completed Projects</span>
            <h4>10</h4>
          </div>
          <div className="fun-fact-icon">
            <i className="icon-material-outline-business-center" />
          </div>
        </div>
        <div className="fun-fact" data-fun-fact-color="#efa80f">
          <div className="fun-fact-text">
            <span>Reviews</span>
            <h4>20</h4>
          </div>
          <div className="fun-fact-icon">
            <i className="icon-material-outline-rate-review" />
          </div>
        </div>
        {/* Last one has to be hidden below 1600px, sorry :( */}
        <div className="fun-fact" data-fun-fact-color="#2a41e6">
          <div className="fun-fact-text">
            <span>This Month Views</span>
            <h4>987</h4>
          </div>
          <div className="fun-fact-icon">
            <i className="icon-feather-trending-up" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
