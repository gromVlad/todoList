import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootStateType } from "./state"
import { ActionThunkDispatchType } from "./ActionThunkDispatchType"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: ActionThunkDispatchType
  rejectValue: null
}>()