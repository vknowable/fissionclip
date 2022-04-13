import { useEffect, useState } from "react";
import * as wn from "webnative";

export function useFilesystem(filesystem, initialState) {
  const fs = filesystem;
  //our app-wide state
  const [store, setStore] = useState(initialState);

  //holds functions for changing app state and persisting changes to storage
  //we can pass this object to other components as needed
  const fsSyncer = {
    //max items to hold on clipboard before they're replaced by newer
    MAX_ITEMS: 10,

    //persist the app state to storage
    flush: async function (data) {
      await fs.write(
        fs.appPath(wn.path.file("store.json")),
        JSON.stringify(data)
      );
      //announce the changes to the server
      await fs.publish();
    },

    //add a new clipboard item
    add: async function (item) {
      const newState = {
        clips: [item, ...store.clips].slice(0, this.MAX_ITEMS),
        pins: [...store.pins],
      };
      await this.flush(newState);
      setStore(newState);
    },

    //delete an item from either array
    delete: async function (id, group) {
      let newState;
      if (group === "clips") {
        newState = {
          clips: store.clips.filter((i) => i.id !== id),
          pins: [...store.pins],
        };
      } else if (group === "pins") {
        newState = {
          clips: [...store.clips],
          pins: store.pins.filter((i) => i.id !== id),
        };
      }
      await this.flush(newState);
      setStore(newState);
    },

    //pin/unpin an item
    pin: async function (id) {
      let newState;
      let index = store.clips.findIndex((i) => i.id === id);
      if (index !== -1) {
        newState = {
          clips: store.clips.filter((i) => i.id !== id),
          pins: [...store.pins, store.clips[index]],
        };
      } else {
        index = store.pins.findIndex((i) => i.id === id);
        newState = {
          clips: [store.pins[index], ...store.clips].slice(0, this.MAX_ITEMS),
          pins: store.pins.filter((i) => i.id !== id),
        };
      }
      await this.flush(newState);
      setStore(newState);
    },

    //initialise the app state from storage
    init: async function () {
      if (!fs) {
        return;
      }
      console.log("attempting to init");
      const dataPath = fs.appPath(wn.path.file("store.json"));
      if (await fs.exists(dataPath)) {
        try {
          const initState = JSON.parse(await fs.read(dataPath));
          setStore(initState);
        } catch {
          console.log("Error reading initial state.");
          //set to empty state
          setStore(initialState);
        }
      }
    },
  };

  useEffect(() => {
    fsSyncer.init();
  }, [fs]); // eslint-disable-line react-hooks/exhaustive-deps

  return [store, fsSyncer];
}
