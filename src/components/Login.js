import React from "react";

import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { authorise } = useAuth();

  return (
    <div className="login-div">
      <h1 className="title">
        <span className="subtitle">fission</span>CLIP
      </h1>
      <button
        className="button-indigo button-sign-in"
        onClick={() => authorise()}
      >
        Sign in with Fission
      </button>
    </div>
  );
};

export default Login;
