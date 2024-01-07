import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./silces/authSlice";
import menuReducer from "./silces/menuSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
  },
});

export default store;
