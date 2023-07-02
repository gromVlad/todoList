import {  memo} from "react";
import style from "./taskItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { useStyledTaskItem, useTaskItem } from "../../../customHook/useTaskItem";
import { Task, TaskStatusType } from "../../../api/todolistApi";

type TaskItemType = {
  removetask: (id: string, idtodo: string) => void;
  changeChekBox: (id: string, status: TaskStatusType, idTodo: string) => void;
  changeTaskTitle: (id: string, value: string, idTodo: string) => void;
  id: string;
  element: Task;
  dis: boolean;
};

export const TaskItem = memo((props: TaskItemType) => {
  const { funRemoveTask, funChangeChekbox, changeSpan } = useTaskItem(
    props.removetask,
    props.changeChekBox,
    props.changeTaskTitle,
    props.id,
    props.element
  );

  

  const { StyledButton } = useStyledTaskItem();
  return (
    <div
      
      className={
        props.element.status === TaskStatusType.Completed
          ? style["is-done"]
          : ""
      }
    >
      <Checkbox
        checked={props.element.status === TaskStatusType.Completed}
        onChange={funChangeChekbox}
        color="primary"
        style={{ verticalAlign: "top" }}
      />
      <EditableSpan title={props.element.title} changeSpan={changeSpan} />
      <StyledButton
        variant="contained"
        onClick={funRemoveTask}
        disabled={props.dis}
        style={{ verticalAlign: "top" }}
      >
        <DeleteIcon />
      </StyledButton>
    </div>
  );
});