import {  memo} from "react";
import style from "./taskItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { Tasktype } from "../../todolist";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { useStyledTaskItem, useTaskItem } from "../../../customHook/useTaskItem";

type TaskItemType = {
  removetask: (id: string, idtodo: string) => void;
  changeChekBox: (id: string, valueBoolean: boolean, idTodo: string) => void;
  changeTaskTitle: (id: string, value: string, idTodo: string) => void;
  id: string;
  element: Tasktype;
};

export const TaskItem = memo((props: TaskItemType) => {
  const { funRemoveTask, funChangeChekbox, changeSpan } = useTaskItem(props.removetask,
  props.changeChekBox,
  props.changeTaskTitle,
  props.id,
  props.element)

  const { StyledButton } = useStyledTaskItem()
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




