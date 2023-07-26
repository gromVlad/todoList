import { ActionCreatorsMapObject, bindActionCreators, } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatchWithType } from 'redusers/ActionThunkDispatchType';


/**

A custom hook that binds an object of Redux action creators to the dispatch function.
@template Actions - A type parameter that extends the ActionCreatorsMapObject type to enforce that actions is an object of action creators.
@param {Actions} actions - An object of Redux action creators.
@returns {BoundActions<Actions>} An object containing the bound action creators.
*/

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useDispatchWithType()

  return useMemo(
    () => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch),
    [actions, dispatch]
  )
}

// Types
type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true
type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>
type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A) => infer R
  ? IsValidArg<A> extends true
  ? (a: A) => TNewReturn
  : () => TNewReturn
  : never
type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}

type User = {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;

const user: PartialUser = {
  name: "John",
  age: 30
};