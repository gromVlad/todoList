import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export interface AppState {
  status: RequestStatusType;
  error: string | null;
}

const initialState: AppState = {
  status: "idle",
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeTackAppStatusAC: (state, action: PayloadAction<{status: RequestStatusType}>) => {
      state.status = action.payload.status;
    },
    changeTackAppErrorAC: (state, action: PayloadAction<{ error: string | null}>) => {
      state.error = action.payload.error;
    },
  },
});

export const ActionsAppReducer = appSlice.actions;

export const appReducerStatus = appSlice.reducer;




