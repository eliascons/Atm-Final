import {  useState } from "react";

import axios from "axios";

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [userValidation, setuserValidation] = useState(true);

  const authHeader = () => {
    return { Authorization: `Bearer ${user}` };
  };



  const register = (username, password) => {
    return axios
      .post("auth/register", { username: username, password: password })
      .then((res) => {
        signin(username, password);
      })
      .catch((err) => {
        console.log(err);
        setuserValidation(false);
      });
  };

  const signin = (username, password) => {

    return axios
      .post("auth/login", { username: username, password: password })
      .then((res) => {
        
        setUser(res.data.accessToken);
       
        setDisplayName(res.data.username);
        setuserValidation(true);   
      })
      .catch((err) => {
        console.log(err);
        setuserValidation(false);
     
      });
  };

  const signout = () => {
    return axios.post("auth/logout", { token: user }).then(() => {
      setUser(null);
    });
  };

  return {
    user,
    signin,
    signout,
    register,
    displayName,
    setDisplayName,
    userValidation,
    setuserValidation,
    authHeader
    
  };
}

export default useProvideAuth;
