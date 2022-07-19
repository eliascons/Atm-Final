import { IdContext, BalanceContext } from "../contexts/context.js";
import { useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";


function Withdraw() {
  const { userInfo } = useContext(IdContext);
  const { currentBalance } = useContext(BalanceContext);

  const [flag, setFlag] = useState(false);
  const [inBalance, setInBalance] = useState(0);

  const auth = useAuth();


  const withdrawBalance = (id) => {
    let temp = Number(currentBalance) - inBalance;
    updateBalance(id, temp);
  }

  const updateBalance = (id, newBal) => {
    axios
      .put(`account/${id}`, { balance: newBal},{ headers: auth.authHeader()})
      .then(() => {
        console.log("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    
    setInBalance(e.target.value);

    if(e.target.value > currentBalance || Number(e.target.value) <= 0 ){
        setFlag(false);
        
    }else{
        setFlag(true);
    }
  }

  

  return (
    <form className="form">
      <h3 className="header-login">Withdraw</h3>
      <label className="label">Account ID: {userInfo}</label>
      <label className="label">Balance: ${currentBalance}</label>
      <input className="input" type="number" value={inBalance} onChange={(e) => handleChange(e)}></input>
      <Link to="/viewAccounts">
        <button className="btn-login" disabled={!flag} onClick={() => withdrawBalance(userInfo)}>Withdraw</button>
      </Link>
      {!flag? <div className="valid-text">Invalid input</div> : <></>}
      
    </form>
  );
}

export default Withdraw;
