import { IdContext, BalanceContext } from "../contexts/context.js";
import { useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";

function Deposit() {
  // this contains the id being passed from the view accounts
  const { userInfo } = useContext(IdContext);
  const { currentBalance } = useContext(BalanceContext);

  const [flag, setFlag] = useState(false);
  const [inBalance, setInBalance] = useState(0);


  
  const auth = useAuth();
 
  const addBalance = (id) =>{
    let tempBal = 0;
    tempBal = (currentBalance) + Number(inBalance);

    updateBalance(id, tempBal);
    
  }

  const updateBalance = (id, newAmount) => {

    axios
      .put(
        `account/${id}`,
        { balance: newAmount },
        { headers: auth.authHeader() }
      )
      .then(() => {
        console.log("Success");
      });
  };

  const handleChange = (e) => {
    setInBalance(e.target.value);

    if (Number(e.target.value) <= 0) {
      return setFlag(false);
    } else {
      setFlag(true);
    }
  };

  return (
    <form className="form">
      <h3 className="header-login">Deposit</h3>
      <label className="label">Account ID: {userInfo}</label>
      <label className="label">Balance: ${currentBalance}</label>
      <input
        className="input"
        type="number"
        placeholder="amount"
        value={inBalance}
        onChange={(e) => handleChange(e)}
      ></input>

      <Link  to="/viewAccounts">
        <button disabled={!flag} className="btn-login" onClick={() => addBalance(userInfo)}>Deposit</button>
      </Link>
      {!flag? <div className="valid-text">Invalid input</div> : <></>}
    </form>
  );
}

export default Deposit;
