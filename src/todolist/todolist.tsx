import React, {  memo, useCallback } from "react";
import { FitervalueType } from "../App";
import style from './todolist.module.css'
import { AddItemForm } from "./components/addItem/addItemForm";
import { EditableSpan } from "./components/EditableSpan/EditableSpan";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskItem } from "./components/taskItem/taskItem";

export type Tasktype = {
  id: string;
  title: string;
  isDone: boolean;
};


type todolistType = {
  title: string;
  taskTodo: Tasktype[];
  id: string;
  removetask: (id: string, idtodo: string) => void;
  changeFilter: (value: FitervalueType, id: string) => void;
  newAddTask: (value: string, id: string) => void;
  changeChekBox: (id: string, valueBoolean: boolean, idTodo: string) => void;
  filter: FitervalueType;
  deleteTodolist: (id: string) => void;
  changeTaskTitle: (id: string, value: string, idTodo: string) => void;
  changeTodoTitle: (value: string, idTodo: string) => void;
};

export const Todolist = memo((props: todolistType) => {

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

   const task = getFilterTodo(props.filter,props.taskTodo)

  //fun change value for button
  const changeValueButton = useCallback(
    (value: FitervalueType, id: string) => {
      props.changeFilter(value, id);
    },
    [props.changeFilter]
  );

  //fun delete Todolist
  const funRemoveTodolist = () =>{
    props.deleteTodolist(props.id)
  }

  //add new task
  const newAddtaskOnValue = useCallback(
    (value: string) => {
      props.newAddTask(value, props.id);
    },
    [props.newAddTask, props.id]
  );

  //change todo title
  const changeTodoTitle = useCallback(
    (value: string) => {
      props.changeTodoTitle(value, props.id);
    },
    [props.changeTodoTitle, props.id]
  );


  return (
    <div style={{borderBottom: "2px solid black", margin:'10px'}}>
      <div>
        <EditableSpan title={props.title} changeSpan={changeTodoTitle} />
        <StyledButton variant="contained" onClick={funRemoveTodolist}>
          <DeleteIcon />
        </StyledButton>
        <AddItemForm newAdd={newAddtaskOnValue} />

        {/* ------map-------*/}
        <div>
          {task.map((element) => {
            return <TaskItem
              removetask={props.removetask}
              changeChekBox={props.changeChekBox}
              changeTaskTitle={props.changeTaskTitle}
              id={props.id}
              element={element}
              key={element.id}
            />;
          })}
        </div>
        {/* ---------------- */}

        <div>
          <AllButton
            variant="contained"
            className={props.filter === "all" ? style["active-filter"] : ""}
            onClick={() => changeValueButton("all", props.id)}
          >
            All
          </AllButton>
          <CompletedButton
            variant="contained"
            className={
              props.filter === "completed" ? style["active-filter"] : ""
            }
            onClick={() => changeValueButton("completed", props.id)}
          >
            Active
          </CompletedButton>
          <ActiveButton
            variant="contained"
            className={props.filter === "active" ? style["active-filter"] : ""}
            onClick={() => changeValueButton("active", props.id)}
          >
            Completed
          </ActiveButton>
        </div>
      </div>
    </div>
  );
})

const StyledButton = styled(Button)(({ theme }) => ({
  padding:"5px",
  marginLeft: "7px",
  backgroundColor: "red",
  color: "white",
  borderRadius: "50%",
  maxWidth: "30px",
  maxHeight: "30px",
  minWidth: "30px",
  minHeight: "30px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

// Определение стилей для каждой кнопки
const AllButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#808080",
  margin: "5px",
  color: "white",
  "&:hover": {
    backgroundColor: "#A9A9A9",
  },
}));

const CompletedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#008000",
  margin: "11px",
  color: "white",
  "&:hover": {
    backgroundColor: "#32CD32",
  },
}));

const ActiveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFA500",
  margin: "8px",
  color: "white",
  "&:hover": {
    backgroundColor: "#FFD700",
  },
}));



