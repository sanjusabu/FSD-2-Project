import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./fonts/FuzzyBubbles-Regular.ttf";
import "./fonts/FuzzyBubbles-Bold.ttf";
import "./fonts/Freehand-Regular.ttf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

reportWebVitals();
