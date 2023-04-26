import { type } from "os";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FitervalueType } from "../App";
import style from './todolist.module.css'
import { AddItemForm } from "./components/addItem/addItemForm";
import { EditableSpan } from "./components/EditableSpan/EditableSpan";

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
    <div className="App">
      <div>
        <EditableSpan title={props.title} changeSpan={changeTodoTitle} />
        <button onClick={funRemoveTodolist}>X</button>
        <AddItemForm newAdd={newAddtaskOnValue} />

        {/* ------map-------*/}
        <ul>
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
                <li
                  key={element.id}
                  className={element.isDone === true ? style["is-done"] : ""}
                >
                  <input
                    type="checkbox"
                    checked={element.isDone}
                    onChange={funChangeChekbox}
                  />
                  <EditableSpan title={element.title} changeSpan={changeSpan} />
                  <button onClick={funRemoveTask}>X</button>
                </li>
              </>
            );
          })}
        </ul>
        {/* ---------------- */}

        <div>
          <button
            className={props.filter === "all" ? style["active-filter"] : ""}
            onClick={() => changeValueButton("all", props.id)}
          >
            All
          </button>
          <button
            className={
              props.filter === "complited" ? style["active-filter"] : ""
            }
            onClick={() => changeValueButton("complited", props.id)}
          >
            Completed
          </button>
          <button
            className={props.filter === "active" ? style["active-filter"] : ""}
            onClick={() => changeValueButton("active", props.id)}
          >
            Active
          </button>
        </div>
      </div>
    </div>
  );
}
