// import { useState } from "react";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Common/Loading";
import Public from "./components/Pages/Public";

import "./App.css";

import { getUser } from "./services/AuthService";
import { useAppDispatch, useAppSelector } from "./redux-store/hooks";
import { setUser } from "./redux-store/slices/UserSlice";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then((user) => {
        dispatch(setUser(user));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Public />;
  }

  return (
    <BrowserRouter>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#2c2c2c",
          color: "white",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
      >
        <div style={{ fontSize: "2.8em" }}>🔥</div>
        <h1>Welcome to the App</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
