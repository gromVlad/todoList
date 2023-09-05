import axios from "axios";
import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolistApi";

export default {
  title: "API",
};

//---------TodoList---------
const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "e908cfda-79ef-4a49-94d7-a2a43ceaff44",
  },
};

//------------------------------------------------
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    axios
      .get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
      .then((res) => setState(res.data));
  }, []);
  return <div>{JSON.stringify(state)}</div>;
}; //[]
//[{"id":"8f21f4a8-c42c-4b06-884e-61921306a585","title":"hello","addedDate":"2023-06-12T04:29:07.457","order":-3},{"id":"879e76d3-d036-4182-bba7-9913f255e8ad","title":"hello","addedDate":"2023-06-12T04:28:35.897","order":-2},{"id":"28d8267f-d014-44f3-9af5-ba76120fed21","title":"hello","addedDate":"2023-06-12T04:28:12.447","order":-1},{"id":"dd175320-7dc3-441a-bcb7-daabd1b9b2a6","title":"hello","addedDate":"2023-06-12T04:26:16.903","order":0}]

//----------------------------------------
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    axios
      .post(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        { title: "hello" },
        settings
      )
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
}; //{"data":{"item":{"id":"28d8267f-d014-44f3-9af5-ba76120fed21","title":"hello","addedDate":"2023-06-12T04:28:12.4451411Z","order":-1}},"messages":[],"fieldsErrors":[],"resultCode":0}

//--------------------------------------------------------
const todolistId1 = "397da940-9bfa-43f7-8efe-a55d3af228cc";

export const deleteTodolistSaga = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    axios
      .delete(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId1}`,
        settings
      )
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
}; //{"data":{},"messages":[],"fieldsErrors":[],"resultCode":0}

//----------------------------------------------------
const todolistId2 = "397da940-9bfa-43f7-8efe-a55d3af228cc";

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    axios
      .put(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId2}`,
        { title: "new title with id" },
        settings
      )
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
}; //{"data":{},"messages":[],"fieldsErrors":[],"resultCode":0}
//[{"id":"397da940-9bfa-43f7-8efe-a55d3af228cc","title":"new title with id","addedDate":"2023-06-12T04:39:50.23","order":-7}

//-----with api DAL ----//

export const UpdateTodolistTitleDAL = () => {
  const [state, setState] = useState<any>(null);
  const [stateValueId, setstateValueId] = useState<any>(null);
  const [stateValueText, setstateValueText] = useState<any>(null);

  const updateTodo = () => {
    const todolistId = "d6e91e44-5933-4765-877a-bee86a7a2cc0";
    todolistAPI.updateTodolist(stateValueId, stateValueText).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <textarea
          value={stateValueId}
          onChange={(e) => setstateValueId(e.currentTarget.value)}
          placeholder="id"
        ></textarea>
        <textarea
          value={stateValueText}
          onChange={(e) => setstateValueText(e.currentTarget.value)}
          placeholder="text"
        ></textarea>
        <button onClick={updateTodo}>UpdateTodolist</button>
      </div>
    </div>
  );
};

export const GetTodolistsDAL = () => {
  const [state, setState] = useState<any>(null);

  const getTodo = () => {
    todolistAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <button onClick={getTodo}>GetTodolists</button>
    </div>
  );
};

export const deleteTodolistSagaDAL = () => {
  const [state, setState] = useState<any>(null);
  const [stateValueId, setstateValueId] = useState<any>(null);

  const deleteTodo = () => {
    todolistAPI.deleteTodolistSaga(stateValueId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <textarea
          value={stateValueId}
          onChange={(e) => setstateValueId(e.currentTarget.value)}
          placeholder="id"
        ></textarea>
        <button onClick={deleteTodo}>DeleteTodo</button>
      </div>
    </div>
  );
};

export const CreateTodolistDAL = () => {
  const [state, setState] = useState<any>(null);
  const [stateValueText, setstateValueText] = useState<any>(null);

  const createTodo = () => {
    todolistAPI.createTodolist(stateValueText).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <textarea
          value={stateValueText}
          onChange={(e) => setstateValueText(e.currentTarget.value)}
          placeholder="text"
        ></textarea>
        <button onClick={createTodo}>CreateTodolist</button>
      </div>
    </div>
  );
};

//------------------------task----------------------------
export const GetTaskDAL = () => {
  const [state, setState] = useState<any>(null);
  const [stateValueId, setstateValueId] = useState<any>(null);

  const getTask = () => {
    todolistAPI.getTask(stateValueId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <textarea
          value={stateValueId}
          onChange={(e) => setstateValueId(e.currentTarget.value)}
          placeholder="id"
        ></textarea>
        <button onClick={getTask}>GetTask</button>
      </div>
    </div>
  );
};

export const DeleteTaskDAL = () => {
  const [state, setState] = useState<any>(null);
  const [stateValueId, setstateValueId] = useState<any>(null);
  const [stateValueidTask, setstateValueidTask] = useState<any>(null);

  const deleteTask = () => {
    todolistAPI.deleteTask(stateValueId, stateValueidTask).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <textarea
          value={stateValueId}
          onChange={(e) => setstateValueId(e.currentTarget.value)}
          placeholder="id"
        ></textarea>
        <textarea
          value={stateValueidTask}
          onChange={(e) => setstateValueidTask(e.currentTarget.value)}
          placeholder="idtask"
        ></textarea>
        <button onClick={deleteTask}>DeleteTask</button>
      </div>
    </div>
  );
};

export const CreateTaskDAL = () => {
  const [state, setState] = useState<any>(null);
  const [stateValueId, setstateValueId] = useState<any>(null);
  const [stateValueText, setstateValueText] = useState<any>(null);

  const createTask = () => {
    todolistAPI.createTask(stateValueId, stateValueText).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <textarea
          value={stateValueId}
          onChange={(e) => setstateValueId(e.currentTarget.value)}
          placeholder="id"
        ></textarea>
        <textarea
          value={stateValueText}
          onChange={(e) => setstateValueText(e.currentTarget.value)}
          placeholder="text"
        ></textarea>
        <button onClick={createTask}>UpdateTodolist</button>
      </div>
    </div>
  );
};

export const UpdateTaskDAL = () => {
  const [state, setState] = useState<any>(null);
  const [stateValueId, setstateValueId] = useState<any>(null);
  const [stateValueidTask, setstateValueidTask] = useState<any>(null);
  const [stateValueText, setstateValueText] = useState<any>("");

  const obj = {
    title: stateValueText,
    description:"",
    status: 2,
    priority: 3,
    startDate: "",
    deadline: ""
  }

  const updateTask = () => {
    todolistAPI.updateTask(stateValueId, stateValueidTask, obj).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <textarea
        value={stateValueId}
        onChange={(e) => setstateValueId(e.currentTarget.value)}
        placeholder="id"
      ></textarea>
      <textarea
        value={stateValueidTask}
        onChange={(e) => setstateValueidTask(e.currentTarget.value)}
        placeholder="idtask"
      ></textarea>
      <textarea
        value={stateValueText}
        onChange={(e) => setstateValueText(e.currentTarget.value)}
        placeholder="text"
      ></textarea>
      <button onClick={updateTask}>UpdateTask</button>
    </div>
  );
};
