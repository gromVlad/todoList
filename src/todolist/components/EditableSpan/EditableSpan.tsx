import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import style from "./addItemForm.module.css";

type EditableSpanType = {
  title: string;
  changeSpan : (value:string) => void
};

export const EditableSpan = (props: EditableSpanType) => {
  let [boolean, setboolean] = useState<boolean>(false);
  let [valueInput, setvalueInput] = useState<string>(props.title);

  const changeBoolean = () => {
    setboolean(!boolean);
    setvalueInput(props.title)
  }

  const changeTextSpan = () => {
    props.changeSpan(valueInput)
    changeBoolean()
  }

  return boolean ? (
    <input
      value={valueInput}
      autoFocus
      onBlur={changeTextSpan}
      onChange={(e) => setvalueInput(e.currentTarget.value)}
    />
  ) : (
    <span onDoubleClick={changeBoolean}>{props.title}</span>
  );
};
