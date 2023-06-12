import axios from "axios";

type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

//вместо
type CreateTodolistResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: {
    item: TodolistType;
  };
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

//второй вариант с джинериками (как значение в функции) для  сreateTodolistResponse
export type ResponseTypeApI<Item> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: Item;
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
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put<UpdateTodolistResponseType>(
      `todo-lists/${todolistId}`,
      { title: title }
    );
    return promise;
  },
  getTodolists() {
    const promise = instance.get<Array<TodolistType>>(
      "todo-lists"
    );
    return promise;
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<DeleteTodolistResponseType>(
      `todo-lists/${todolistId}`
    );
    return promise;
  },
  createTodolist(title: string) {
    const promise =
      instance.post<ResponseTypeApI<{ item: TodolistType }>>("todo-lists", {
        title,
      });
    return promise;
  },
};
