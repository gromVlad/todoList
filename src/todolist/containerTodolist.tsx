import { useSelector } from "react-redux";
import { useAppWithRedux } from "../customHook/useAppWithRedux";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "./components/addItem/addItemForm";
import { Todolist } from "./todolist";
import { AppRootStateType } from "../redusers/state";
import { RequestStatusType } from "../redusers/app-reducer";
import { Navigate } from "react-router";
import { useSelectorWithType } from "../redusers/ActionThunkDispatchType";



export const ContainerTodolist = () => {

  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.appStatus.status
  );

  const isLogin = useSelectorWithType<boolean>(
    (state) => state.login.isLoggedIn
  );

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
    deleteTodolistSaga,
  } = useAppWithRedux();

  if (!isLogin) {
    return <Navigate to={"/Login"} />;
  }

  return (
    <>
      <Grid
          container
          style={{ margin: "10px", borderBottom: "2px solid black" }}
        >
          <h2>Add Todolist</h2>
          <AddItemForm newAdd={addTodolist} dis={status === "loading"} />
        </Grid>
        <Grid container spacing={8}>
          {todolists.map((todo) => {
            return (
              <Grid item key={todo.id}>
                <Paper >
                  <Todolist
                    todo={todo}
                    taskTodo={tasks[todo.id]}
                    removetask={removetask}
                    changeFilter={changeFilter}
                    newAddTask={newAddTask}
                    changeChekBox={changeChekBox}
                    deleteTodolistSaga={deleteTodolistSaga}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoTitle={changeTodoTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
    </>
  )
}