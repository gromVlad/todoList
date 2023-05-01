import React, { useState } from "react";
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

function App() {
  //---------------
  //v1 -random id values
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TaskType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  // task----------------------------
  //fun remove task
  function removetask(id: string, idTodo: string) {
    setTasks({
      ...tasks,
      [idTodo]: tasks[idTodo].filter((el) => el.id !== id),
    });
  }

  //add new task
  const newAddTask = (value: string, id: string) => {
    const newTask = { id: v1(), title: value, isDone: false };
    setTasks({ ...tasks, [id]: [newTask, ...tasks[id]] });
  };

  //fun change chekbox
  const changeChekBox = (id: string, valueBoolean: boolean, idTodo: string) => {
    setTasks({
      ...tasks,
      [idTodo]: tasks[idTodo].map((el) =>
        el.id === id ? { ...el, isDone: valueBoolean } : el
      ),
    });
  };

  //change task title
  const changeTaskTitle = (id: string, value: string, idTodo: string) => {
    setTasks({
      ...tasks,
      [idTodo]: tasks[idTodo].map((el) =>
        el.id === id ? { ...el, title: value } : el
      ),
    });
  };
  //------------task

  //--todolist---------------------
  //delete todolist
  const deleteTodolist = (idTodo: string) => {
    setTodolists(todolists.filter((el) => el.id !== idTodo));
    delete tasks[idTodo];
    setTasks({ ...tasks });
  };

  //change task title
  const changeTodoTitle = (value: string, idTodo: string) => {
    setTodolists([
      ...todolists.map((el) =>
        el.id === idTodo ? { ...el, title: value } : el
      ),
    ]);
  };

  const addTodolist = (title: string) => {
    let todolistID = v1();
    setTodolists([
      ...todolists,
      { id: todolistID, title: title, filter: "all" },
    ]);
    setTasks({ ...tasks, [todolistID]: [] });
  };

  //return new value in state
  function changeFilter(value: FitervalueType, id: string) {
    setTodolists(
      todolists.map((el) => (el.id === id ? { ...el, filter: value } : el))
    );
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

export default App;
