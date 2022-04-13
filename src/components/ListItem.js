import React, { useContext } from "react";
import Linkify from "react-linkify";
import { StoreContext } from "../App";

const ListItem = ({ content, id, group }) => {
  const recvdStoreContext = useContext(StoreContext);

  return (
    <li className="list-item">
      {group === "pins" && (
        <button
          className="button-indigo button-pin is-pinned"
          onClick={() => recvdStoreContext.fsSyncer.pin(id)}
        >
          Pin
        </button>
      )}
      {group === "clips" && (
        <button
          className="button-indigo button-pin"
          onClick={() => recvdStoreContext.fsSyncer.pin(id)}
        >
          Pin
        </button>
      )}
      <button
        className="button-indigo"
        onClick={() => navigator.clipboard.writeText(content)}
      >
        Copy
      </button>
      {/* Linkify is a handy package to automatically detect and make clickable links in the item text */}
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <a target="blank" href={decoratedHref} key={key} class="link">
            {decoratedText}
          </a>
        )}
      >
        <span className="content-container">
          <span className="content">{content}</span>
        </span>
      </Linkify>
      <button
        className="button-indigo button-delete"
        onClick={() => recvdStoreContext.fsSyncer.delete(id, group)}
      >
        Delete
      </button>
    </li>
  );
};

export default ListItem;
