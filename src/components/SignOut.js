import React from "react";

import { useAuth } from "../hooks/useAuth";

const SignOut = () => {
  const { logout } = useAuth();

  return (
    <button className="button-indigo button-sign-out" onClick={() => logout()}>
      Sign Out
    </button>
  );
};

export default SignOut;
