import { memo } from "react";
import { useEditableSpan, useStyledComponentEditableSpan } from "../../../customHook/useEditableSpan";

type EditableSpanType = {
  title: string;
  changeSpan: (value: string) => void;
};

export const EditableSpan = memo( (props: EditableSpanType) => {

  const {
    isEditing,
    setIsEditing,
    inputValue,
    handleChange,
    handleKeyDown,
    handleDoubleClick,
  } = useEditableSpan(props.title, props.changeSpan);

  const {StyledTextField} = useStyledComponentEditableSpan()
  
  return isEditing ? (
    <StyledTextField
      value={inputValue}
      autoFocus
      onBlur={() => setIsEditing(false)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      onDoubleClick={handleDoubleClick}
      style={{
        fontSize: "21px",
        marginLeft: "5px",
        wordWrap: "break-word",
        maxWidth: "200px",
        display: "inline-block",
      }}
    >
      {props.title}
    </span>
  );
})
