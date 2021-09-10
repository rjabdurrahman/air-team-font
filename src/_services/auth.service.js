import { BehaviorSubject } from "rxjs";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { handleResponse } from "../_helpers/handle-response";

const currentUserSubject = new BehaviorSubject(
  localStorage.getItem("ACCESS_TOKEN")
);

export const authenticationService = {
  login,
  validateUser,
  validateUser1,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    var userData = {};
    var Token = currentUserSubject.value;
    let headerConfig = { headers: { authorization: Token } };
    return (
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/auth/validateUser",
          {},
          headerConfig
        )
        // .then(handleResponse)
        .then(user => {
          console.log("user", user);
          return user;
          //return Token;
        })
    );
    return userData;
  }

  //   currentUser1: currentUserValue,
  //   currentUserValue
};

function validateUser() {
  var isUserValid = false;
  var Token = localStorage.getItem("ACCESS_TOKEN");
  let headerConfig = { headers: { authorization: Token } };
  return axios
    .post(
      process.env.REACT_APP_API_BASE_URL + "/auth/validateUser",
      {},
      headerConfig
    )
    .then(user => {
      var userDecodedData = jwt_decode(localStorage.getItem("ACCESS_TOKEN"));
      if (user.data.id === userDecodedData.id) return true;
      else return false;
    });
}

async function validateUser1() {
  var Token = localStorage.getItem("ACCESS_TOKEN");
  const res = await axios.post(
    process.env.REACT_APP_API_BASE_URL + "/auth/validateUser",
    {},
    { headers: { authorization: Token } }
  );
  return res.data;
}

// function login(username, password) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password })
//   };

//   return fetch(process.env.REACT_APP_API_BASE_URL + "/auth", requestOptions)
//     .then(handleResponse)
//     .then(user => {
//       // store user details and jwt token in local storage to keep user logged in between page refreshes
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       currentUserSubject.next(user);

//       return user;
//     });
// }

function login(email, password) {
  const payload = {
    email: email,
    password: password
  };

  console.log("payload", payload);
  return axios
    .post(process.env.REACT_APP_API_BASE_URL + "/auth", payload)
    .then(user => {
      console.log("user", user);
      const loginData = user.data;
      if (loginData.status) {
        localStorage.setItem("ACCESS_TOKEN", loginData.accessToken);
        currentUserSubject.next(user);
        return user;
      }
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("ACCESS_TOKEN");
  currentUserSubject.next(null);
}
