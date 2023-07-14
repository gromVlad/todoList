import { useCallback } from "react";
import { useSelector } from "react-redux";
import { TaskType, addNewTasksThunk ,removeTasksThunk, updateTask } from "../redusers/reduser_tasks";
import { AppRootStateType } from "../redusers/state";
import { useDispatchWithType, useSelectorWithType } from "../redusers/ActionThunkDispatchType";
import {
  FitervalueType,
  addNewTodolistThunk,
  changeTitleTodolistThunk,
  deleteTodolistThunk,
  TodoListTypeState,
  allActionsTodolist
} from "../redusers/reduser_todolist";
import { TaskStatusType } from "../api/todolistApi";

export const useAppWithRedux = () => {
  const todolists = useSelector<AppRootStateType, TodoListTypeState[]>((state) => state.todolist);
  const isLogin = useSelectorWithType<boolean>((state) => state.login.isLoggedIn);
  const tasks = useSelector<AppRootStateType, TaskType>((state) => state.tasks);

  const dispatch = useDispatchWithType();

  //fun remove task
  const removetask = useCallback(
    (id: string, idTodo: string) => {
      dispatch(removeTasksThunk({id, idTodo}));
    },
    [dispatch],
  );

  //add new task
  const newAddTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addNewTasksThunk({ title, todolistId }));
    },
    [dispatch],
  );

  //fun change chekbox
  const changeChekBox = useCallback(
    (id: string, status: TaskStatusType, idTodo: string) => {
      dispatch(updateTask(id, idTodo, { status }));
    },
    [dispatch],
  );

  //change task title
  const changeTaskTitle = useCallback(
    (id: string, title: string, idTodo: string) => {
      dispatch(updateTask(id, idTodo, { title }));
    },
    [dispatch],
  );
  //------------task

  //--todolist---------------------
  //delete todolist
  const deleteTodolist = useCallback(
    (idTodo: string) => {
      dispatch(deleteTodolistThunk(idTodo));
    },
    [dispatch],
  );

  //change task title
  const changeTodoTitle = useCallback(
    (value: string, idTodo: string) => {
      dispatch(changeTitleTodolistThunk(idTodo, value));
    },
    [dispatch],
  );

  //add new todolist
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addNewTodolistThunk(title));
    },
    [dispatch],
  );

  //return new value in state
  const changeFilter = useCallback(
    (value: FitervalueType, id: string) => {
      dispatch(allActionsTodolist.changeTodoListFilter({ id, filter: value}));
    },
    [dispatch],
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
};
