import { ChangeEvent, KeyboardEvent, useState } from "react";

export const useAddItemForm = (newAdd: (value: string) => void) => {
  //CREATE local use state for input
  let [valueInput, setValueInput] = useState("");

  //create error state
  let [error, setError] = useState<string | null>(null);

  const funAddValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const funKeyHundler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    setError(null);
    if (event.key === "Enter") {
      NewTaskAdd();
    }
  };

  //fun add task local if not empty string
  const NewTaskAdd = () => {
    if (valueInput.trim() !== "") {
      newAdd(valueInput.trim());
      setValueInput("");
    } else {
      setError("Not correct values");
    }
  };

  return {
    valueInput,
    error,
    funAddValueInput,
    funKeyHundler,
    NewTaskAdd
  };
}