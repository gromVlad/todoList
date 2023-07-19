import { ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators, } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatchWithType } from 'redusers/ActionThunkDispatchType';


/**

A custom hook that binds an object of Redux action creators to the dispatch function.
@template Actions - A type parameter that extends the ActionCreatorsMapObject type to enforce that actions is an object of action creators.
@param {Actions} actions - An object of Redux action creators.
@returns {BoundActions<Actions>} An object containing the bound action creators.
*/

export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>
  (actions: Actions): BoundActions<Actions> => {
  const dispatch = useDispatchWithType();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};

// Types
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
  ? BoundAsyncThunk<Actions[key]>
  : Actions[key];
};

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;
