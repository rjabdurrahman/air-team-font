import { useState, useEffect } from "react";
import axios from "axios";

export default function useFindUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function findUser() {
      var Token = localStorage.getItem("ACCESS_TOKEN");
      // console.log("Token", Token);
      if (Token) {
        let headerConfig = { headers: { authorization: Token } };
        await axios
          .post(
            process.env.REACT_APP_API_BASE_URL + "/auth/validateUser",
            {},
            headerConfig
          )
          .then(res => {
            setUser(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    findUser();
  }, []);

  return {
    user,
    setUser
  };
}
