import { useEffect, useState } from "react";
import * as wn from "webnative";

export function useAuth() {
  //state => webnative auth state; fs => handle to user's filesystem
  const [authState, setAuthState] = useState(null);
  let fs;

  const authorise = () => {
    if (authState) {
      wn.redirectToLobby(authState.permissions);
    }
  };

  const logout = () => {
    wn.leave();
  };

  useEffect(() => {
    async function getState() {
      const result = await wn.initialise({
        permissions: {
          //Will ask the user permission to store
          //app's data in `private/Apps/spork/FissionClip`
          app: {
            name: "FissionClip",
            creator: "spork",
          },
        },
      });
      setAuthState(result);
    }

    getState();
  }, []);

  switch (authState?.scenario) {
    case wn.Scenario.AuthCancelled:
      // user cancelled auth process from lobby, if any actions needed perform here
      break;

    case wn.Scenario.AuthSucceeded:
    case wn.Scenario.Continuation:
      fs = authState.fs;
      break;

    default:
      break;
  }

  return { authorise, logout, fs, authState };
}
