import { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";


/**

A hook for creating an editable span component with the ability to switch between
displaying text and allowing the user to edit it.
@param {string} title - The initial text to display in the span.
@param {(value: string) => void} changeSpan - A function to call when the user has finished editing
the span and the new value should be saved.
@returns {Object} An object containing state variables and event handlers for the editable span.
*/

export const useEditableSpan = (title: string, changeSpan: (value: string) => void) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(title);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      changeSpan(inputValue);
      setIsEditing(false);
    } else if (event.key === "Escape") {
      setInputValue(title);
      setIsEditing(false);
    }
  };

  return {
    isEditing,
    setIsEditing,
    inputValue,
    handleChange,
    handleKeyDown,
    handleDoubleClick,
  };
};


/**

A hook for creating a styled TextField component for use with useEditableSpan.
@returns {Object} An object containing a styled TextField component for use with useEditableSpan.
*/
export const useStyledComponentEditableSpan = () => {
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

  return {
    StyledTextField,
  };
};
