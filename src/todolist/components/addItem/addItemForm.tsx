import { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useAddItemForm } from "../../../customHook/useaAddItemForm";

type AddItemFormProps = {
  newAdd: (value: string) => void;
  dis?:boolean
};

export const AddItemForm = memo((props: AddItemFormProps) => {
  const { valueInput, error, funAddValueInput, funKeyHundler, NewTaskAdd } =
    useAddItemForm(props.newAdd);

  return (
    <div>
      <TextField
        placeholder="Enter"
        value={valueInput}
        onChange={funAddValueInput}
        onKeyDown={funKeyHundler}
        error={!!error}
        helperText={error ? "Task title is required" : ""}
        style={{ margin: "10px" }}
      />
      <Button
        disabled = {props.dis}
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
          padding: "0px",
        }}
      >
        +
      </Button>
      {valueInput.length > 10 && <div>Текст слишком длинный</div>}
      {/* add text info error */}
    </div>
  );
});
