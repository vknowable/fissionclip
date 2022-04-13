import React, { useContext } from "react";
import { StoreContext } from "../App";

import Input from "./Input";
import ListItem from "./ListItem";

const Clipboard = () => {
  const recvdStoreContext = useContext(StoreContext);
  const clipItems = recvdStoreContext.store.clips;
  const pinItems = recvdStoreContext.store.pins;

  return (
    <div>
      <Input />
      <ul>
        {pinItems.map((i) => (
          <ListItem key={i.id} content={i.content} id={i.id} group="pins" />
        ))}
      </ul>
      <ul>
        {clipItems.map((i) => (
          <ListItem key={i.id} content={i.content} id={i.id} group="clips" />
        ))}
      </ul>
    </div>
  );
};

export default Clipboard;
