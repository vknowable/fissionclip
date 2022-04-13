import "./App.css";
import React, { useMemo } from "react";

import Loading from "./components/Loading";
import Login from "./components/Login";
import Clipboard from "./components/Clipboard";
import SignOut from "./components/SignOut";

import { useAuth } from "./hooks/useAuth";
import { useFilesystem } from "./hooks/useFilesystem";

//context to share state across child components
export const StoreContext = React.createContext();

function App() {
  //new items are added to 'clips' with old ones being removed after a max size is reached
  //items can be moved to 'pins' which keeps them from being cycled out
  //our app state will look like this:
  //{ clips: [{id: "...", content: "..."}, {id: "...", content: "..."}, ...]},
  //  pins: [{id: "...", content: "..."}, {id: "...", content: "..."}, ...]}, }
  const EMPTY_STATE = { clips: [], pins: [] };

  //get auth state and filesystem handle
  const { authState, fs } = useAuth();
  const [store, fsSyncer] = useFilesystem(fs, EMPTY_STATE);
  //construct the context value object with our store and state manipulation function refs
  const contextValue = useMemo(() => {
    return { store: store, fsSyncer: fsSyncer };
  }, [store, fsSyncer]);

  //if authenticated, show app
  if (authState) {
    if (authState?.authenticated) {
      return (
        <div className="App">
          <div className="masthead">
            <h1 className="title">
              <span className="subtitle">fission</span>CLIP
            </h1>
            <SignOut />
          </div>
          <div className="center-in-view">
            {/* make our store and state manipulation functions available to child components */}
            <StoreContext.Provider value={contextValue}>
              <Clipboard />
            </StoreContext.Provider>
          </div>
        </div>
      );
    }
    //otherwise prompt for signin
    else {
      return (
        <div className="App">
          <div className="center-in-view" style={{ paddingTop: "5rem" }}>
            <Login />
          </div>
        </div>
      );
    }
  }

  //while querying auth state, display loading message
  return (
    <div className="App">
      <div className="center-in-view" style={{ paddingTop: "8rem" }}>
        <Loading />
      </div>
    </div>
  );
}

export default App;
