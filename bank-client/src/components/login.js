import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

// Login
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status] = useState("Invalid username or password");

  let location = useLocation();
  let navigate = useNavigate();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/viewAccounts" } };

  let login = (e) => {
    e.preventDefault();
    auth
      .signin(username, password)
      .then(() => {
        navigate(from);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>

      <form className="form">
      
        <h3 className="header-login">Login</h3>
        
        <label className="label" >Username:</label>

        <input
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label className="label" >Password:</label>

        <input
          placeholder="Password"
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button onClick={(e)=> login(e)} className="btn-login">Login</button>
        <div >{auth.userValidation === false ? <div className="valid-text">{status}</div> : <></>}</div>
      </form>
    </div>
  );
}

export default Login;
