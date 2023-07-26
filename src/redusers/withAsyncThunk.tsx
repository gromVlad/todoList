import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootStateType } from "./state"
import { ActionThunkDispatchType } from "./ActionThunkDispatchType"
import { ResponseTypeApI } from "api/todolistApi"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: ActionThunkDispatchType
  rejectValue: null | ResponseTypeApI
}>()


