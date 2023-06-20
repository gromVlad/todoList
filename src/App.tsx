import "./App.css";
import { Todolist } from "./todolist/todolist";
import { AddItemForm } from "./todolist/components/addItem/addItemForm";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, Grid, Paper } from "@mui/material";
import { useAppWithRedux } from "./customHook/useAppWithRedux";



function App() {
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
  } = useAppWithRedux()

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
              <Grid item key={todo.id}>
                <Paper>
                  <Todolist
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

export default App;


