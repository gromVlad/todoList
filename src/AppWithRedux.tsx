import React, { useCallback, useReducer} from "react";
import "./App.css";
import { Tasktype, Todolist } from "./todolist/todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./todolist/components/addItem/addItemForm";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, Grid, Paper } from "@mui/material";
import { AddTodoTypeAC, ChangeTodoFilterAC, ChangeTodoTitleAC, RemoveTodolistAC, userReducerTodolist } from "./redusers/reduser_todolist";
import { addTackAC, changeTacIsDonekAC, changeTacTitlekAC, removeTackAC, userReducerTask } from "./redusers/reduser_tasks";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./redusers/state";

//v1 -random id values

export type FitervalueType = "all" | "completed" | "active";

//type todolists
export type TodolistsType = {
  id: string;
  title: string;
  filter: FitervalueType;
};

//type tasks
export type TaskType = {
  [key: string]: Tasktype[];
};

function AppWithRedux() {
   const todolists = useSelector<AppRootStateType, TodolistsType[]>((state) => state.todolist);
  const tasks = useSelector<AppRootStateType, TaskType>((state) => state.tasks);
  const dispatch = useDispatch()

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
    (id: string, valueBoolean: boolean, idTodo: string) => {
      dispatch(changeTacIsDonekAC(id, valueBoolean, idTodo));
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
  //--todolist---------------------useCallback(

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#4caf50" }}>
          <Toolbar style={{ textAlign: "center", color: "black" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              style={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TodoList
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container fixed>
        <Grid
          container
          style={{ margin: "10px", borderBottom: "2px solid black" }}
        >
          <h2>Add Todolist</h2>
          <AddItemForm newAdd={addTodolist} />
        </Grid>
        <Grid container spacing={8}>
          {todolists.map((todo) => {

            return (
              <Grid item>
                <Paper>
                  <Todolist
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    taskTodo={tasks[todo.id]}
                    removetask={removetask}
                    changeFilter={changeFilter}
                    newAddTask={newAddTask}
                    changeChekBox={changeChekBox}
                    filter={todo.filter}
                    deleteTodolist={deleteTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoTitle={changeTodoTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;


