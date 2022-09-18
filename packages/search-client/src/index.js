import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ResultsContextProvider } from "./context/ResultsContextProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ResultsContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ResultsContextProvider>
);
