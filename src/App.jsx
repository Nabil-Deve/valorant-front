// App.jsx : c'est la page qui s'affiche tout le temps dans le front
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

import Logout from "./components/Logout";
import AllAgent from "./pages/AllAgent";
import CreateAgent from "./pages/createAgent";
import CreateAbility from "./pages/createAbility";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Quand le user arrive la 1r fois sur le site, le site sait qu'il n'est pas authentifié.

  // Le user arrivve sur notre site. S'il y a un token, il est authentifié. Sinon, il doit se loger.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/create-ability">Create Ability</Link>
            </li>
            <li>
              <Link to="/create-agent">Create Agent</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/all-agents">All Agents</Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/create-ability"
            element={
              isAuthenticated ? <CreateAbility /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/create-agent"
            element={
              isAuthenticated ? <CreateAgent /> : <Navigate to="/login" />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<LogIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/all-agents"
            element={isAuthenticated ? <AllAgent /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
