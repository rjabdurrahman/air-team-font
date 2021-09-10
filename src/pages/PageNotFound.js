import React from "react";

function PageNotFound(props) {
  return (
    <div>
      {/* Page Content ================================================== */}
      {/* Container */}
      <div className="container margin-top-65">
        <div className="row">
          <div className="col-xl-12">
            <section
              id="not-found"
              className="center margin-top-50 margin-bottom-25"
            >
              <h2>
                404 <i className="icon-line-awesome-question-circle" />
              </h2>
              <p>
                We're sorry, but the page you were looking for doesn't exist
              </p>
            </section>
          </div>
        </div>
      </div>
      {/* Container / End */}
      {/* Spacer */}
      <div className="margin-top-70" />
      {/* Spacer / End*/}
    </div>
  );
}

export default PageNotFound;
