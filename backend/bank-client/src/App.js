import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import CreateAccount from "./components/createAccount.js";
import Home from "./components/home";
import Login from "./components/login.js";
import { AuthProvider } from "./contexts/authContext.js";
import RequireAuth from "./components/RequireAuth.js";
import Navi from "./components/navi.js";
import ViewAccounts from "./components/viewAccounts.js";
import Deposit from "./components/deposit.js";
import Register from "./components/register.js";
import Withdraw from "./components/withdraw.js";
// Styles
// import "./Styles/style.css";
// User Context
import { IdContext, BalanceContext } from "./contexts/context.js";
import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  return (

    <AuthProvider>
      <Router>
        <Navi />

        <BalanceContext.Provider value={{ currentBalance, setCurrentBalance }}>
          <IdContext.Provider value={{ userInfo, setUserInfo }}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<RequireAuth />}>
                <Route path="/createAccount" element={<CreateAccount />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/viewAccounts" element={<ViewAccounts />} />
              </Route>
            </Routes>
          </IdContext.Provider>
        </BalanceContext.Provider>

      </Router>
    </AuthProvider>
  );
}

export default App;
