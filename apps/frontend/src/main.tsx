// import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux-store";

import { ThemeProvider } from "@mui/material/styles";
import { AppTheme } from "./styles/Mui";

import App from "./App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Enable next if you require it
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={AppTheme}>
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
