import axios from "axios";

var user;

export function checkAuth(user_role) {
  console.log("checkAuth");
  var Token = localStorage.getItem("ACCESS_TOKEN");
  if (Token) {
    let headerConfig = { headers: { authorization: Token } };
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/auth/validateUser",
        {},
        headerConfig
      )
      .then(res => {
        if (user_role == "") user = res.data;
        else if (res.data.user_role == user_role) user = res.data;
        else {
          // console.log("err", res.data);
          logout();
          localStorage.setItem(
            "ERROR_MSG",
            "Invalid session, Login again to continue..."
          );
          localStorage.setItem("ERROR_CLS", "error");
          window.location.href = "/";
        }
      })
      .catch(error => {
        console.log("err", error);

        logout();
        localStorage.setItem(
          "ERROR_MSG",
          "Invalid session, Login again to continue..."
        );
        localStorage.setItem("ERROR_CLS", "error");
        window.location.href = "/";
      });

    return user;
  } else {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
  localStorage.removeItem("USER_ID");
}
