import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskType, addTackAC, changeTacIsDonekAC, changeTacTitlekAC, removeTackAC } from "../redusers/reduser_tasks";
import { AppRootStateType } from "../redusers/state";
import { FitervalueType, TodolistsType } from "../App";
import { AddTodoTypeAC, ChangeTodoFilterAC, ChangeTodoTitleAC, RemoveTodolistAC } from "../redusers/reduser_todolist";
import { TaskStatusType } from "../api/todolistApi";

export const useAppWithRedux = () => {
  const todolists = useSelector<AppRootStateType, TodolistsType[]>(
    (state) => state.todolist
  );
  const tasks = useSelector<AppRootStateType, TaskType>((state) => state.tasks);
  const dispatch = useDispatch();

  // task----------------------------
  //fun remove task
  const removetask = useCallback(
    (id: string, idTodo: string) => {
      dispatch(removeTackAC(id, idTodo));
    },
    [dispatch]
  );

  //add new task
  const newAddTask = useCallback(
    (value: string, id: string) => {
      dispatch(addTackAC(value, id));
    },
    [dispatch]
  );

  //fun change chekbox
  const changeChekBox = useCallback(
    (id: string, status: TaskStatusType, idTodo: string) => {
      dispatch(changeTacIsDonekAC(id, status, idTodo));
    },
    [dispatch]
  );

  //change task title
  const changeTaskTitle = useCallback(
    (id: string, value: string, idTodo: string) => {
      dispatch(changeTacTitlekAC(id, value, idTodo));
    },
    [dispatch]
  );
  //------------task

  //--todolist---------------------
  //delete todolist
  const deleteTodolist = useCallback(
    (idTodo: string) => {
      dispatch(RemoveTodolistAC(idTodo));
    },
    [dispatch]
  );

  //change task title
  const changeTodoTitle = useCallback(
    (value: string, idTodo: string) => {
      dispatch(ChangeTodoTitleAC(idTodo, value));
    },
    [dispatch]
  );

  //add new todolist
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(AddTodoTypeAC(title));
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
    deleteTodolist,
  };
}