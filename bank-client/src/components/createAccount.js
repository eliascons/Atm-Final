import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { Link } from 'react-router-dom';

function CreateAccount() {
  const [input, setInput] = useState(0);
  const auth = useAuth();

  const [flag, setFlag] = useState(false);

  const handleSubmit = (balance) => {
    axios.post("account", { balance }, { headers: auth.authHeader() });
  };

  const handleChange = (e) => {
    setInput(e.target.value);

    if (Number(e.target.value) <= 0) {
      return setFlag(false);
    } else {
      setFlag(true);
    }
  };

  return (
    <>
      <form className="form">
        <h3 className="header-login">Create Account</h3>
        <label className="label">Enter deposit amount for new account:</label>
        <input
          className="input"
          placeholder="deposit"
          type="number"
          value={input}
          onChange={(e) => handleChange(e)}
        ></input>
     
        <Link to="/viewAccounts" style={{pointerEvents: flag === true ? '' : 'none'} }>
        <button className="btn-login" disabled={!flag} onClick={() => handleSubmit(input)}> {!flag ? <div>Invalid Input</div> : <div>Submit</div>}</button>
        </Link>
      </form>
    </>
  );
}

export default CreateAccount;
