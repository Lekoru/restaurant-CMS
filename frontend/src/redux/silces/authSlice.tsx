import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocal, saveToLocal } from "../../helpers/storage";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const getAuth = () => async (dispatch: any) => {
  const dataFromGet = await loadFromLocal("emauth");
  dispatch(setAuth(dataFromGet));
};

export const saveAuthToLocal = () => (_dispatch: any, getState: any) => {
  saveToLocal(getState().auth.auth, "emauth");
};

export default authSlice.reducer;
