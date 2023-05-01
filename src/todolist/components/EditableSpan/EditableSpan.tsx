import React, { useState } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

type EditableSpanType = {
  title: string;
  changeSpan: (value: string) => void;
};

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "black",
    fontSize: "16px",
    fontWeight: "normal",
    lineHeight: "1.5",
    padding: "5px 7px",
    borderRadius: "4px",
    border: "1px solid #ced4da",
    backgroundColor: "white",
    "&:hover": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
    "&:focus": {
      outline: "none",
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
});

export const EditableSpan = (props: EditableSpanType) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(props.title);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.changeSpan(inputValue);
      setIsEditing(false);
    } else if (event.key === "Escape") {
      setInputValue(props.title);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <StyledTextField
      value={inputValue}
      autoFocus
      onBlur={() => setIsEditing(false)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span onDoubleClick={handleDoubleClick} style={{ fontSize: "21px" ,marginLeft:"5px"}}>
      {props.title}
    </span>
  );
};
