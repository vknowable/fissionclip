import React from "react";
import logo from "../logo.svg";

const Loading = () => {
  return (
    <p
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.6rem"
      }}
    >
      <img src={logo} className="App-logo" alt="logo" />
      <span>Loading ...</span>
      <img src={logo} className="App-logo" alt="logo" />
    </p>
  );
};

export default Loading;
