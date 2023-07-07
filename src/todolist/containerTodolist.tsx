import { useSelector } from "react-redux";
import { useAppWithRedux } from "../customHook/useAppWithRedux";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "./components/addItem/addItemForm";
import { Todolist } from "./todolist";
import { AppRootStateType } from "../redusers/state";
import { RequestStatusType } from "../redusers/app-reducer";
import { Navigate } from "react-router";
import { useDispatchWithType, useSelectorWithType } from "../redusers/ActionThunkDispatchType";
import { useState } from "react";
import { TodoListTypeState, reorderTodolistTC } from "redusers/reduser_todolist";
import style from "./containerTodolist.module.css";

export const ContainerTodolist = () => {
  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.appStatus.status);

  const isLogin = useSelectorWithType<boolean>((state) => state.login.isLoggedIn);

  const dispatch = useDispatchWithType();

  const {
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
  } = useAppWithRedux();

  let [currentList, setCurrentList] = useState<string>("");
  let [pointer, setPointer] = useState<boolean>(false);

  if (!isLogin) {
    return <Navigate to={"/Login"} />;
  }

  const handleDragStart = (event: any, currentList: TodoListTypeState) => {
    setCurrentList(currentList.id);
    setPointer(true);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.target.parentNode.classList.add(style.paperDragover);
  };

  const handleDragEnd = (event: any) => {
    event.target.style.background = "white";
    setPointer(false);
  };

  const handleDragEnter = (event: any) => {
    event.preventDefault();
  };

  const handleDragLeave = (event: any) => {
    event.target.parentNode.classList.remove(style.paperDragover);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetTodo: TodoListTypeState) => {
    dispatch(reorderTodolistTC(currentList, targetTodo.id));
  };

  return (
    <>
      <Grid container style={{ margin: "10px", borderBottom: "2px solid black" }}>
        <h2>Add Todolist</h2>
        <AddItemForm newAdd={addTodolist} dis={status === "loading"} />
      </Grid>
      <Grid container spacing={8}>
        {todolists.map((todo) => {
          return (
            <Grid item key={todo.id}>
              <Paper
                draggable
                onDragStart={(e) => handleDragStart(e, todo)}
                onDragEnd={(e) => handleDragEnd(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e, todo)}
              >
                <Todolist
                  todo={todo}
                  taskTodo={tasks[todo.id]}
                  removetask={removetask}
                  changeFilter={changeFilter}
                  newAddTask={newAddTask}
                  changeChekBox={changeChekBox}
                  deleteTodolist={deleteTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodoTitle={changeTodoTitle}
                />
                {pointer && (
                  <>
                    <div className={style.customArrow}></div>
                  </>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
