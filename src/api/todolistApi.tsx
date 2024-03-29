import axios, { AxiosResponse } from "axios";

//----------todolist----------
export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type UpdateTodolistResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: {};
};

type DeleteTodolistResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: {};
};

type FieldErrorType = {
  error: string
  field: string
}

export type ResponseTypeApI<Item = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: FieldErrorType[]
  data: Item;
};

//------------TaskTodo----------//

type TaskTodoType = {
  items: Task[];
  totalCount: number;
  error: string;
};

export enum TaskStatusType {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  later = 4,
}

export type Task = {
  description: string;
  title: string;
  status: TaskStatusType;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type PutTypeTask = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export type LoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "e908cfda-79ef-4a49-94d7-a2a43ceaff4",
  },
});

export const todolistAPI = {
  login(loginBox: LoginType) {
    const promise = instance.post<ResponseTypeApI<{ id: number }>>(`auth/login`, loginBox);
    return promise;
  },
  me() {
    const promise = instance.get<ResponseTypeApI<{ id: number; email: string; login: string }>>(`auth/me`);
    return promise;
  },
  logout() {
    const promise = instance.delete<ResponseTypeApI>(`auth/login`);
    return promise;
  },
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put<ResponseTypeApI, AxiosResponse<ResponseTypeApI>, { title: string }>(
      `todo-lists/${todolistId}`,
      {
        title: title,
      },
    );
    return promise;
  },
  getTodolists() {
    const promise = instance.get<Array<TodolistType>>("todo-lists");
    return promise;
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseTypeApI>(`todo-lists/${todolistId}`);
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseTypeApI<{ item: TodolistType }>>("todo-lists", {
      title,
    });
    return promise;
  },

  reorder(todolistId: string, putAfterItemId: string | null) {
    return instance.put<ResponseTypeApI>(`/todo-lists/${todolistId}/reorder`, {
      putAfterItemId,
    });
  },

  //---task
  getTask(todolistId: string) {
    const promise = instance.get<TaskTodoType>(`todo-lists/${todolistId}/tasks`);
    return promise;
  },

  deleteTask(todolistId: string, taskId: string) {
    const promise = instance.delete<ResponseTypeApI>(`todo-lists/${todolistId}/tasks/${taskId}`);
    return promise;
  },

  createTask(todolistId: string, title: string) {
    const promise = instance.post<ResponseTypeApI<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, {
      title,
    });
    return promise;
  },

  updateTask(todolistId: string, taskId: string, objects: PutTypeTask) {
    const promise = instance.put<ResponseTypeApI<{ item: PutTypeTask }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      objects,
    );
    return promise;
  },

  reorderTasks(todolistId: string, taskId: string, putAfterItemId: string | null) {
    return instance.put<ResponseTypeApI>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, {
      putAfterItemId,
    });
  },
};

const instance2 = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "e908cfda-79ef-4a49-94d7-a2a43ceaff4",
  },
});

export const captchaAPI = {
  getCaptchUser() {
    return instance2.put(`security/get-captcha-url`);
  },
};
