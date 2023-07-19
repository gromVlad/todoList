import { ChangeEvent, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Task, TaskStatusType } from "../api/todolistApi";


/**

A hook for creating state handlers for a task item, including event handlers for removing the task,
changing the checkbox status, and changing the task title.
@param {(id: string, idtodo: string) => void} removetask - A function to call when the task is to be removed.
@param {(id: string, status: TaskStatusType, idTodo: string) => void} changeChekBox - A function to call when the checkbox status is changed.
@param {(id: string, value: string, idTodo: string) => void} changeTaskTitle - A function to call when the task title is changed.
@param {string} id - The ID of the task.
@param {Task} element - The task object containing the task data.
@returns {Object} An object containing state variables and event handlers for the task item.
*/

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

/**

A hook for creating a styled component for a task item.
@returns {Object} An object containing a styled Button component for use with a task item.
*/

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
