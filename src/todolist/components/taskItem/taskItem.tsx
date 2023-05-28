import React, { ChangeEvent, memo, useCallback } from "react";
import style from "./taskItem.module.css";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { Tasktype } from "../../todolist";
import { EditableSpan } from "../EditableSpan/EditableSpan";

type TaskItemType = {
  removetask: (id: string, idtodo: string) => void;
  changeChekBox: (id: string, valueBoolean: boolean, idTodo: string) => void;
  changeTaskTitle: (id: string, value: string, idTodo: string) => void;
  id: string;
  element: Tasktype;
};

export const TaskItem = memo((props: TaskItemType) => {
  //fun removetask in map
  const funRemoveTask = () => {
    props.removetask(props.element.id, props.id);
  };

  //fun change checkbox in map
  const funChangeChekbox = (event: ChangeEvent<HTMLInputElement>) => {
    props.changeChekBox(
      props.element.id,
      event.currentTarget.checked,
      props.id
    );
  };

  //change task Title in map
  const changeSpan = useCallback(
    (value: string) => {
      props.changeTaskTitle(props.element.id, value, props.id);
    },
    [props.changeTaskTitle, props.element.id, props.id]
  );

  return (
    <>
      <div
        key={props.element.id}
        className={props.element.isDone === true ? style["is-done"] : ""}
      >
        <Checkbox
          checked={props.element.isDone}
          onChange={funChangeChekbox}
          color="primary"
        />
        <EditableSpan title={props.element.title} changeSpan={changeSpan} />
        <StyledButton variant="contained" onClick={funRemoveTask}>
          <DeleteIcon />
        </StyledButton>
      </div>
    </>
  );
})

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "5px",
  marginLeft: "7px",
  backgroundColor: "red",
  color: "white",
  borderRadius: "50%",
  maxWidth: "30px",
  maxHeight: "30px",
  minWidth: "30px",
  minHeight: "30px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
}))
