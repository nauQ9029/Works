import React, { useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserList from "./components/UserList";
import NotFound from "./components/NotFound";
import usersData from "./data/users.json";

const UserDetail = React.lazy(() =>
  import("./components/UserDetail")
);

export const UserContext = createContext();

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  return (
    <UserContext.Provider value={users}>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id/*" element={<UserDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </Router>
    </UserContext.Provider>
  );
}
