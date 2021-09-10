import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../_hooks/UserContext";

import { NotificationManager } from "react-notifications";

export default function CreatorRoute({ children, ...rest }) {
  const { user } = useContext(UserContext);
  // console.log("user", user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user
          ? children
          : (NotificationManager.error(
              "Invalid Login, Please login to continue.",
              "Error !!!"
            ),
            (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
            ))
      }
    />
  );
}
