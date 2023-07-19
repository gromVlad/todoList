import { useCallback, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Task, TaskStatusType } from "../api/todolistApi";
import { useDispatchWithType } from "../redusers/ActionThunkDispatchType";
import { FitervalueType } from "../redusers/reduser_todolist";
import { tasksThunks } from "redusers/reduser_tasks";

/**

A hook for creating state handlers for a todo list, including event handlers for filtering tasks,
deleting the todo list, adding a new task, and changing the todo list title.
@param {FitervalueType} filter - The current filter value for the todo list.
@param {Task[]} taskTodo - An array of task objects representing the tasks in the todo list.
@param {(value: FitervalueType, id: string) => void} changeFilter - A function to call when the filter value changes.
@param {string} id - The ID of the todo list.
@param {(id: string) => void} deleteTodolist - A function to call when the todo list is to be deleted.
@param {(value: string, id: string) => void} newAddTask - A function to call when a new task is to be added to the todo list.
@param {(value: string, idTodo: string) => void} changeTodoTitle - A function to call when the todo list title is to be changed.
@returns {Object} An object containing state variables and event handlers for the todo list.
*/

export const useTodoList = (
  filter: FitervalueType,
  taskTodo: Task[],
  changeFilter: (value: FitervalueType, id: string) => void,
  id: string,
  deleteTodolist: (id: string) => void,
  newAddTask: (value: string, id: string) => void,
  changeTodoTitle: (value: string, idTodo: string) => void,
) => {
  const dispatch = useDispatchWithType();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasksThunk(id));
  }, []);

  const getFilterTodo = (filter: FitervalueType, todo: Task[]) => {
    switch (filter) {
      case "active":
        return todo.filter((el) => el.status === TaskStatusType.Completed);
      case "completed":
        return todo.filter((el) => el.status === TaskStatusType.New);
      default:
        return todo;
    }
  };

  const task = getFilterTodo(filter, taskTodo);

  //fun change value for button
  const changeValueButton = useCallback(
    (value: FitervalueType, id: string) => {
      changeFilter(value, id);
    },
    [changeFilter],
  );

  //fun delete Todolist
  const funRemoveTodolist = () => {
    deleteTodolist(id);
  };

  //add new task
  const newAddtaskOnValue = useCallback(
    (value: string) => {
      newAddTask(value, id);
    },
    [newAddTask, id],
  );

  //change todo title
  const changeTodoTitleRet = useCallback(
    (value: string) => {
      changeTodoTitle(value, id);
    },
    [changeTodoTitle, id],
  );
  return {
    task,
    changeValueButton,
    funRemoveTodolist,
    newAddtaskOnValue,
    changeTodoTitleRet,
  };
};

export const useStyledComponentTodolist = () => {
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

  // Определение стилей для каждой кнопки
  const AllButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#808080",
    margin: "5px",
    color: "white",
    "&:hover": {
      backgroundColor: "#A9A9A9",
    },
  }));

  const CompletedButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#008000",
    margin: "11px",
    color: "white",
    "&:hover": {
      backgroundColor: "#32CD32",
    },
  }));

  const ActiveButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#FFA500",
    margin: "8px",
    color: "white",
    "&:hover": {
      backgroundColor: "#FFD700",
    },
  }));

  return {
    StyledButton,
    AllButton,
    CompletedButton,
    ActiveButton,
  };
};
