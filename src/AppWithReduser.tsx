import React, { useReducer} from "react";
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

function AppWithReduser() {
   const todolists = useSelector<AppRootStateType, TodolistsType[]>((state) => state.todolist);
  const tasks = useSelector<AppRootStateType, TaskType>((state) => state.tasks);
  const dispatch = useDispatch()

  // task----------------------------
  //fun remove task
  function removetask(id: string, idTodo: string) {
    dispatch(removeTackAC(id, idTodo));
  }

  //add new task
  const newAddTask = (value: string, id: string) => {
    dispatch(addTackAC(value, id));
  };

  //fun change chekbox
  const changeChekBox = (id: string, valueBoolean: boolean, idTodo: string) => {
    dispatch(changeTacIsDonekAC(id, valueBoolean, idTodo));
  };

  //change task title
  const changeTaskTitle = (id: string, value: string, idTodo: string) => {
    dispatch(changeTacTitlekAC(id, value, idTodo));
  };
  //------------task

  //--todolist---------------------
  //delete todolist
  const deleteTodolist = (idTodo: string) => {
    dispatch(RemoveTodolistAC(idTodo));
  };

  //change task title
  const changeTodoTitle = (value: string, idTodo: string) => {
    dispatch(ChangeTodoTitleAC(idTodo, value));
  };

  //add new todolist
  const addTodolist = (title: string) => {
    dispatch(AddTodoTypeAC(title));
  };

  //return new value in state
  function changeFilter(value: FitervalueType, id: string) {
    dispatch(ChangeTodoFilterAC(id, value));
  }
  //--todolist---------------------

  const getFilterTodo = (filter: FitervalueType, todo: Tasktype[]) => {
    switch (filter) {
      case "active":
        return todo.filter((el) => el.isDone === true);
      case "completed":
        return todo.filter((el) => el.isDone === false);
      default:
        return todo;
    }
  };

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
            let tastInComponents = getFilterTodo(todo.filter, tasks[todo.id]);

            return (
              <Grid item>
                <Paper>
                  <Todolist
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    task={tastInComponents}
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

export default AppWithReduser;
