import { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";



type AddItemFormProps= {
  newAdd: (value: string) => void;
};

export const AddItemForm = (props: AddItemFormProps) => {
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
      <TextField
        placeholder="Enter"
        value={valueInput}
        onChange={funAddValueInput}
        onKeyDown={funKeyHundler}
        error={!!error}
        helperText={error ? "Task title is required" : ""}
        style={{ margin: "10px",}}
      />
      {/* disabled if length < = 0 */}
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={NewTaskAdd}
        style={{
          color: "black",
          fontSize: "25px",
          borderRadius: "10px",
          marginTop: "13px",
          backgroundColor: "rgb(74, 163, 89)",
          padding:"0px"
        }}
      >
        +
      </Button>
      {valueInput.length > 10 && <div>Текст слишком длинный</div>}
      {/* add text info error */}
    </div>
  );
};
