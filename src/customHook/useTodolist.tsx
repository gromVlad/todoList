import { useCallback, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Task, TaskStatusType } from "../api/todolistApi";
import { useDispatchWithType } from "../redusers/ActionThunkDispatchType";
import { FitervalueType } from "../redusers/reduser_todolist";
import { tasksThunks } from "redusers/reduser_tasks";

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
