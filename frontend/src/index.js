import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/fonts/Bushido/bushido-shadow.ttf";
import "./assets/fonts/Bushido/bushido-regular.ttf";
import "./assets/fonts/AnimeAce/anime-ace-regular.ttf";
import "./assets/fonts/Cartoonist/Cartoonist-regular.ttf";
import "./assets/fonts/GosmickSans/GosmickSans.ttf";
import "./assets/fonts/Inika/Inika-Regular.ttf";
import "./assets/fonts/Komika/Komika.ttf";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
