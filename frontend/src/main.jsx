import React from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18+
import { Provider } from "react-redux";
import { store } from "../store.js"; // Adjust the path if necessary
import App from "./App.jsx";
import './index.css' 

const root = ReactDOM.createRoot(document.getElementById("root")); // React 18 method
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
