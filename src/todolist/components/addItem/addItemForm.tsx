import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import style from "./addItemForm.module.css";

type AddItemForm = {
  newAdd: (value: string) => void;
};

export const AddItemForm = (props: AddItemForm) => {
  //CREATE local use state for input
  let [valueInput, setValueInput] = useState("");

  //create error state
  let [error, setError] = useState<string | null>(null);

  const funAddValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const funKeyHundler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      NewTaskAdd();
    }
  };

  //fun add task local if not empty string
  const NewTaskAdd = () => {
    if (valueInput.trim() !== "") {
      props.newAdd(valueInput.trim());
      setValueInput("");
    } else {
      setError("Not correct values");
    }
  };

  return (
    <div>
      <input
        placeholder="Enter task"
        value={valueInput}
        onChange={funAddValueInput}
        onKeyDown={funKeyHundler}
        className={error ? style.error : ""}
      />
      {/* disabled if length < = 0 */}
      <button onClick={NewTaskAdd} disabled={valueInput.length === 0}>
        +
      </button>
      {valueInput.length > 10 && <div>Текст слишком длинный</div>}
      {/* add text info error */}
      {error && <div className={style["error-message"]}>{error}</div>}
    </div>
  );
};
