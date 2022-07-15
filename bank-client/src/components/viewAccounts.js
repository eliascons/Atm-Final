import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../contexts/authContext";
import { IdContext, BalanceContext } from "../contexts/context.js";
import { Link } from "react-router-dom";

function ViewAccounts() {
  const { setUserInfo } = useContext(IdContext);
  const { setCurrentBalance } = useContext(BalanceContext);

  const [accounts, setAccounts] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const fetchAccounts = () => {
    axios.get("account", { headers: auth.authHeader() }).then((res) => {
      setAccounts(res.data);
    });
  };

  const removeAccount = (id) => {
    axios.delete(`account/${id}`, { headers: auth.authHeader() }).then(() => {
      fetchAccounts();
    });
  };

  const handleDeposit = (id, currentBalance) => {
    setUserInfo(id);
    setCurrentBalance(currentBalance);
  };

  return (
    <div>
      <h1 className="accounts-header">Accounts</h1>
      {accounts.map((account, index) => {
        return (
          <div className="card-grid" key={index}>
            <div className="card">
              <div className="card-header">Account #{index}</div>
              <div className="card-body">
                <div>User id: {account.user}</div>
                <div>Acount id: {account._id}</div>
                <div>Balance: ${account.balance}</div>
              </div>

              <div className="card-footer">
                <Link to="/deposit" className="card-link">
                  <button
                    className="btn"
                    onClick={() => handleDeposit(account._id, account.balance)}
                  >
                    Deposit
                  </button>
                </Link>
                <Link to="/withdraw" className="card-link">
                  <button
                    className="btn"
                    onClick={() => handleDeposit(account._id, account.balance)}
                  >
                    Withdraw
                  </button>
                </Link>

                <button className="btn btn-outline" onClick={() => removeAccount(account._id)}>Delete</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewAccounts;
