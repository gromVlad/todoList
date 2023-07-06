import { ChangeEvent, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Task, TaskStatusType } from "../api/todolistApi";

export const useTaskItem = (
  removetask: (id: string, idtodo: string) => void,
  changeChekBox: (id: string, status: TaskStatusType, idTodo: string) => void,
  changeTaskTitle: (id: string, value: string, idTodo: string) => void,
  id: string,
  element: Task,
) => {
  //fun removetask in map
  const funRemoveTask = () => {
    removetask(element.id, id);
  };

  //fun change checkbox in map
  const funChangeChekbox = (event: ChangeEvent<HTMLInputElement>) => {
    changeChekBox(element.id, event.currentTarget.checked ? TaskStatusType.Completed : TaskStatusType.New, id);
  };

  //change task Title in map
  const changeSpan = useCallback(
    (value: string) => {
      changeTaskTitle(element.id, value, id);
    },
    [changeTaskTitle, element.id, id],
  );

  return {
    funRemoveTask,
    funChangeChekbox,
    changeSpan,
  };
};

export const useStyledTaskItem = () => {
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
  }));

  return {
    StyledButton,
  };
};
