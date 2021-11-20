import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/index.css";
import "./assets/css/App.css";
import { setDefaultOptions } from "esri-loader";

setDefaultOptions({ css: true });
ReactDOM.render(
  <React.StrictMode>
    <App />/
  </React.StrictMode>,
  document.getElementById("root")
);
