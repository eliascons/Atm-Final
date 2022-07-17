import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/authContext.js";
import IMG from '../images/bank.png'



function Navi() {
  const [isShown, setIsShown] = useState(false);

  let auth = useAuth();

  let signout = () => {
    auth.signout(() => {
      console.log("logout");
      auth.setDisplayName("");
    });
  };

  return (
    <nav className="navbar">

      <ul className="navbar-nav">
      <img src={IMG} alt="bank" className="img"></img>
     
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/createAccount" className="nav-link">
            New Account
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/viewAccounts" className="nav-link">
            View Accounts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>

        {auth.user ? (
          isShown ? (
            <li onMouseLeave={() => setIsShown(false)} className="nav-item">
              <Link to="/" onClick={signout} className="nav-link">
                <span className="nav-text">Logout</span>
              </Link>
            </li>
          ) : (
            <li
              className="nav-item"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <div className="nav-link">{auth.displayName}</div>
            </li>
          )
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navi;
