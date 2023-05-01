import React, { ChangeEvent } from "react";
import { FitervalueType } from "../App";
import style from './todolist.module.css'
import { AddItemForm } from "./components/addItem/addItemForm";
import { EditableSpan } from "./components/EditableSpan/EditableSpan";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

export type Tasktype = {
  id: string;
  title: string;
  isDone: boolean;
};


type todolistType = {
  title: string;
  task: Tasktype[];
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

export function Todolist(props: todolistType) {
  //fun change value for button
  const changeValueButton = (value: FitervalueType,id:string) => {
    props.changeFilter(value,id);
  };

  //fun delete Todolist
  const funRemoveTodolist = () =>{
    props.deleteTodolist(props.id)
  }

  //add new task
  const newAddtaskOnValue = (value:string) => {
    props.newAddTask(value, props.id)
  }

  //change todo title
  const changeTodoTitle = (value:string) => {
    props.changeTodoTitle(value,props.id)
  }


  return (
    <div style={{borderBottom: "2px solid black", margin:'10px' }}>
      <div>
        <EditableSpan title={props.title} changeSpan={changeTodoTitle} />
        <StyledButton variant="contained" onClick={funRemoveTodolist}>
          <DeleteIcon />
        </StyledButton>
        <AddItemForm newAdd={newAddtaskOnValue} />

        {/* ------map-------*/}
        <div>
          {props.task.map((element) => {
            //fun removetask in map
            const funRemoveTask = () => {
              props.removetask(element.id, props.id);
            };

            //fun change checkbox in map
            const funChangeChekbox = (event: ChangeEvent<HTMLInputElement>) => {
              props.changeChekBox(
                element.id,
                event.currentTarget.checked,
                props.id
              );
            };

            //change task Title in map
            const changeSpan = (value: string) => {
              props.changeTaskTitle(element.id, value, props.id);
            };

            return (
              <>
                <div
                  key={element.id}
                  className={element.isDone === true ? style["is-done"] : ""}
                >
                  {/* <input
                    type="checkbox"
                    checked={element.isDone}
                    onChange={funChangeChekbox}
                  /> */}
                  <Checkbox
                    checked={element.isDone}
                    onChange={funChangeChekbox}
                    color="primary"
                  />
                  <EditableSpan title={element.title} changeSpan={changeSpan} />
                  <StyledButton variant="contained" onClick={funRemoveTask}>
                    <DeleteIcon />
                  </StyledButton>
                </div>
              </>
            );
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
}

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

