import { memo } from "react";
import style from "./taskItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { useStyledTaskItem, useTaskItem } from "../../../customHook/useTaskItem";
import { Task, TaskStatusType } from "../../../api/todolistApi";
import { useDispatchWithType } from "../../../redusers/ActionThunkDispatchType";
import { reorderTaskInListTC } from "../../../redusers/reduser_tasks";
import { fetchTodos } from "../../../redusers/reduser_todolist";

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
    props.element,
  );
  const dispatch = useDispatchWithType();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("application/json", JSON.stringify(props.element));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("dragged-over");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragged-over");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const sourceTask = JSON.parse(e.dataTransfer.getData("application/json"));
    const destinationTaskId = e.currentTarget.id;
    const sourceTodoListId = props.id;
    dispatch(reorderTaskInListTC(sourceTodoListId, sourceTask.id, destinationTaskId));
    e.currentTarget.classList.remove("dragged-over");
  };

  const { StyledButton } = useStyledTaskItem();
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      key={props.element.id}
      id={props.element.id}
      className={props.element.status === TaskStatusType.Completed ? style["is-done"] : ""}
    >
      <Checkbox
        checked={props.element.status === TaskStatusType.Completed}
        onChange={funChangeChekbox}
        color="primary"
        style={{ verticalAlign: "top" }}
      />
      <EditableSpan title={props.element.title} changeSpan={changeSpan} />
      <StyledButton variant="contained" onClick={funRemoveTask} disabled={props.dis} style={{ verticalAlign: "top" }}>
        <DeleteIcon />
      </StyledButton>
    </div>
  );
});
