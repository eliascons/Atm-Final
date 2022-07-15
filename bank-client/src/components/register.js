import { useState } from "react";
import { useAuth } from "../contexts/authContext";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState('');
  const [exist] = useState('User already Exist')
  const [submitted, setSubmitted] = useState(false);

  const auth = useAuth();

  const validate = (field, label) => {

    if (!field) {
      setStatus(`Error invalid ${label} please enter valid username`);
      return false;
    }
    else if (label === 'password' && field.length < 8) {
      setStatus(`Error invalid ${label}, it must be atleast 8 characters long`);
      return false;
    }
    else {
      return true;
    }

  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(username, 'username')){
      return
    }else{
      setStatus('');
    };
    if (!validate(password, 'password')){
      return
    }else{
      setStatus('');
    };

    register();

  }


  const handleUser = (e) => {
    e.preventDefault();
    setUsername(e.target.value);

  };

  const handlePass = (e) => {
    e.preventDefault();
    setPassword(e.target.value);


  };

  const newUser = () => {
    setSubmitted(true);
  }

  let register = () => {
    auth
      .register(username, password)
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (

    <form className="form-register">
      <h3 className="header-login">Register</h3>
      {submitted === false ? (
        <>
          <label className="label" >Username:</label>
          <input value={username} onChange={(e) => handleUser(e)} placeholder="Username"
            className="input"></input>
          <label className="label" >Password:</label>

          <input
            placeholder="Password"
            className="input"
            value={password}
            type="password"
            onChange={(e) => handlePass(e)}
          ></input>

          <button onClick={(e) => handleSubmit(e)} className="btn-login">
            Register
          </button></>) : <button onClick={newUser} className="btn-login">Create new user</button>}

      <div>{auth.userValidation === false ? <div className="valid-text">{exist}</div> : <></>}</div>
      <div className="valid-text">{status}</div>

    </form>
  );
}

export default Register;
