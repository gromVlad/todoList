import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CircularProgress, Container, LinearProgress } from "@mui/material";
import { AppRootStateType } from "./redusers/state";
import { useSelector } from "react-redux";
import { RequestStatusType } from "./redusers/app-reducer";
import { ErrorSnackbar } from "./todolist/components/Snackbar/Snackbar";
import { ContainerTodolist } from "./todolist/containerTodolist";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./todolist/components/Login/Login";
import { useEffect } from "react";
import { useDispatchWithType, useSelectorWithType } from "./redusers/ActionThunkDispatchType";
import { initializeAppTC, logoutTC } from "./redusers/auth-reducer";
import { fetchTodos } from "redusers/reduser_todolist";

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.appStatus.status);
  const isInitialized = useSelectorWithType<boolean>((state) => state.login.isInit);
  const isLoggedIn = useSelectorWithType<boolean>((state) => state.login.isLoggedIn);

  const isLogin = useSelectorWithType<boolean>((state) => state.login.isLoggedIn);

  const dispacth = useDispatchWithType();

  useEffect(() => {
    dispacth(initializeAppTC());
    if (isLogin) {
      dispacth(fetchTodos());
    }
  }, [dispacth, isLogin]);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <ErrorSnackbar />
        <AppBar position="static" sx={{ backgroundColor: "#4caf50" }}>
          <Toolbar style={{ textAlign: "center", color: "black" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TodoList
            </Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={() => dispacth(logoutTC())}>
                logout
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
      </Box>
      <Container fixed>
        <HashRouter>
          <Routes>
            <Route path="/" element={<ContainerTodolist />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </Container>
    </div>
  );
}

export default App;
