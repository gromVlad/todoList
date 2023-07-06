import { memo, useEffect } from "react";
import style from "./todolist.module.css";
import { AddItemForm } from "./components/addItem/addItemForm";
import { EditableSpan } from "./components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskItem } from "./components/taskItem/taskItem";
import { useStyledComponentTodolist, useTodoList } from "../customHook/useTodolist";
import { Task, TaskStatusType } from "../api/todolistApi";
import { FitervalueType, TodoListTypeState, reorderTodolistTC } from "../redusers/reduser_todolist";
import { RequestStatusType } from "../redusers/app-reducer";
import { AppRootStateType } from "../redusers/state";
import { useSelector } from "react-redux";
import { useDispatchWithType } from "../redusers/ActionThunkDispatchType";

type todolistType = {
  todo: TodoListTypeState;
  taskTodo: Task[];
  removetask: (id: string, idtodo: string) => void;
  changeFilter: (value: FitervalueType, id: string) => void;
  newAddTask: (value: string, id: string) => void;
  changeChekBox: (id: string, status: TaskStatusType, idTodo: string) => void;
  deleteTodolist: (id: string) => void;
  changeTaskTitle: (id: string, value: string, idTodo: string) => void;
  changeTodoTitle: (value: string, idTodo: string) => void;
};

export const Todolist = memo((props: todolistType) => {
  const entityStatus = useSelector<AppRootStateType, RequestStatusType>((state) => state.appStatus.status);

  const dispatch = useDispatchWithType();

  const { task, changeValueButton, funRemoveTodolist, newAddtaskOnValue, changeTodoTitleRet } = useTodoList(
    props.todo.filter,
    props.taskTodo,
    props.changeFilter,
    props.todo.id,
    props.deleteTodolist,
    props.newAddTask,
    props.changeTodoTitle,
  );

  const { StyledButton, AllButton, CompletedButton, ActiveButton } = useStyledComponentTodolist();

  const handleDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", props.todo.id);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    event.target.classList.add("dragged-over");
  };

  const handleDragLeave = (event: any) => {
    event.target.classList.remove("dragged-over");
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const sourceTodoId = event.dataTransfer.getData("text/plain");
    const targetTodoId = props.todo.id;
    dispatch(reorderTodolistTC(sourceTodoId, targetTodoId));
  };

  return (
    <div
      className={style.card}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div>
        <EditableSpan title={props.todo.title} changeSpan={changeTodoTitleRet} />
        <StyledButton variant="contained" onClick={funRemoveTodolist} disabled={props.todo.entityStatus}>
          <DeleteIcon />
        </StyledButton>
        <AddItemForm newAdd={newAddtaskOnValue} dis={entityStatus === "loading"} />

        {/* ------map-------*/}
        <div>
          {task.map((element) => {
            return (
              <TaskItem
                removetask={props.removetask}
                changeChekBox={props.changeChekBox}
                changeTaskTitle={props.changeTaskTitle}
                id={props.todo.id}
                element={element}
                key={element.id}
                dis={entityStatus === "loading"}
              />
            );
          })}
        </div>
        {/* ---------------- */}

        <div>
          <AllButton
            variant="contained"
            className={props.todo.filter === "all" ? style["active-filter"] : ""}
            onClick={() => changeValueButton("all", props.todo.id)}
          >
            All
          </AllButton>
          <CompletedButton
            variant="contained"
            className={props.todo.filter === "completed" ? style["active-filter"] : ""}
            onClick={() => changeValueButton("completed", props.todo.id)}
          >
            Active
          </CompletedButton>
          <ActiveButton
            variant="contained"
            className={props.todo.filter === "active" ? style["active-filter"] : ""}
            onClick={() => changeValueButton("active", props.todo.id)}
          >
            Completed
          </ActiveButton>
        </div>
      </div>
    </div>
  );
});
