import React, { useContext, useRef, useState } from "react";
import { StoreContext } from "../App";
import { v4 as uuid } from "uuid";

const Input = () => {
  const recvdStoreContext = useContext(StoreContext);
  //contents of text box
  const [inputState, setInputState] = useState("");
  const inputRef = useRef();

  const onNewValue = (event) => {
    setInputState(event.target.value);
  };

  const onAdd = (event) => {
    //shift + enter => go to new line instead of submitting
    if (event.type === "click" || (event.key === "Enter" && !event.shiftKey)) {
      inputRef.current.focus();
      event.preventDefault();
      inputState.trim();
      if (inputState.length < 1) {
        return;
      }

      const newItem = {
        id: uuid(),
        content: inputState,
      };
      recvdStoreContext.fsSyncer.add(newItem);
      setInputState("");
    }
  };

  return (
    <div className="input-section">
      <textarea
        className="text-input"
        placeholder="Enter some text..."
        rows={5}
        autoFocus={true}
        value={inputState}
        onChange={onNewValue}
        onKeyDown={onAdd}
        ref={inputRef}
      />
      <button className="button-indigo button-add" onClick={onAdd}>
        Add
      </button>
    </div>
  );
};

export default Input;
