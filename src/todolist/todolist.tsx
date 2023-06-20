import  {  memo } from "react";
import style from './todolist.module.css'
import { AddItemForm } from "./components/addItem/addItemForm";
import { EditableSpan } from "./components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskItem } from "./components/taskItem/taskItem";
import { useStyledComponentTodolist, useTodoList } from "../customHook/useTodolist";
import { Task, TaskStatusType } from "../api/todolistApi";
import { FitervalueType } from "../redusers/reduser_todolist";


type todolistType = {
  title: string;
  taskTodo: Task[];
  id: string;
  removetask: (id: string, idtodo: string) => void;
  changeFilter: (value: FitervalueType, id: string) => void;
  newAddTask: (value: string, id: string) => void;
  changeChekBox: (id: string, status: TaskStatusType, idTodo: string) => void;
  filter: FitervalueType;
  deleteTodolist: (id: string) => void;
  changeTaskTitle: (id: string, value: string, idTodo: string) => void;
  changeTodoTitle: (value: string, idTodo: string) => void;
};



export const Todolist = memo((props: todolistType) => {

  const {
    task,
    changeValueButton,
    funRemoveTodolist,
    newAddtaskOnValue,
    changeTodoTitleRet,
  } = useTodoList(
  props.filter,
  props.taskTodo,
  props.changeFilter,
  props.id,
  props.deleteTodolist,
  props.newAddTask,
  props.changeTodoTitle,
)

  const { StyledButton, AllButton, CompletedButton, ActiveButton } =
  useStyledComponentTodolist();

  return (
    <div style={{borderBottom: "2px solid black", margin:'10px'}}>
      <div>
        <EditableSpan title={props.title} changeSpan={changeTodoTitleRet} />
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
