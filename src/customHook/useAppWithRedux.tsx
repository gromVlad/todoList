import { useCallback} from "react";
import { useSelector } from "react-redux";
import { TaskType, addNewTasksThunk,removeTasksThunk, updateTask } from "../redusers/reduser_tasks";
import { AppRootStateType } from "../redusers/state";
import { useDispatchWithType} from "../redusers/ActionThunkDispatchType";

import { TaskStatusType } from "../api/todolistApi";
import { ChangeTodoFilterAC, FitervalueType, TodolistsTypes } from "../redusers/reduser_todolist";
import { addNewTodolistSagaCall, changeTitleTodolistSagaCall, deleteTodolistSagaCall } from "../redusers/saga/todolistSaga";

export const useAppWithRedux = () => {
  const todolists = useSelector<AppRootStateType, TodolistsTypes[]>(
    (state) => state.todolist
  );
 
  const tasks = useSelector<AppRootStateType, TaskType>((state) => state.tasks);

  const dispatch = useDispatchWithType();


  // task----------------------------
  //fun remove task
  const removetask = useCallback(
    (id: string, idTodo: string) => {
      dispatch(removeTasksThunk(id, idTodo));
    },
    [dispatch]
  );

  //add new task
  const newAddTask = useCallback(
    (value: string, id: string) => {
      dispatch(addNewTasksThunk(value, id));
    },
    [dispatch]
  );

  //fun change chekbox
  const changeChekBox = useCallback(
    (id: string, status: TaskStatusType, idTodo: string) => {
      dispatch(updateTask(id, idTodo, {status}));
    },
    [dispatch]
  );

  //change task title
  const changeTaskTitle = useCallback(
    (id: string, title: string, idTodo: string) => {
      dispatch(updateTask(id, idTodo, {title}));
    },
    [dispatch]
  );
  //------------task

  //--todolist---------------------
  //delete todolist
  const deleteTodolistSaga = useCallback(
    (idTodo: string) => {
      dispatch(deleteTodolistSagaCall(idTodo));
    },
    [dispatch]
  );

  //change task title
  const changeTodoTitle = useCallback(
    (value: string, idTodo: string) => {
      dispatch(changeTitleTodolistSagaCall(idTodo, value));
    },
    [dispatch]
  );

  //add new todolist
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addNewTodolistSagaCall(title));
    },
    [dispatch]
  );

  //return new value in state
  const changeFilter = useCallback(
    (value: FitervalueType, id: string) => {
      dispatch(ChangeTodoFilterAC(id, value));
    },
    [dispatch]
  );
  //--todolist
  return {
    todolists,
    tasks,
    removetask,
    newAddTask,
    changeChekBox,
    changeTaskTitle,
    addTodolist,
    changeFilter,
    changeTodoTitle,
    deleteTodolistSaga,
  };
}