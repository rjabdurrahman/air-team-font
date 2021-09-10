import React from "react";

function ErrorNotifications(props) {
  if (localStorage.getItem("ERROR_MSG")) {
    var message = localStorage.getItem("ERROR_MSG");
    var cls = localStorage.getItem("ERROR_CLS");

    localStorage.removeItem("ERROR_MSG");
    localStorage.removeItem("ERROR_CLS");

    return (
      <>
        <div className="col-md-12">
          <div className={`notification ${cls} closeable no-shadow`}>
            <p>{message}</p>
            <a className="close" />
          </div>
        </div>
      </>
    );
  } else return null;
}

export default ErrorNotifications;
