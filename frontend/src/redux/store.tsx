import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./silces/authSlice";
import userReducer from "./silces/usersSlice";
import menuReducer from "./silces/menuSlice";
import usersSlice from "./silces/usersSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  users: usersSlice
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    user: userReducer
  },
});

export default store;
