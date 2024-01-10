import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './silces/authSlice.tsx'
import userReducer from './silces/usersSlice.tsx'
import menuReducer from './silces/menuSlice.tsx'
import dishReducer from './silces/dishesSlice.tsx'

export const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  users: userReducer,
  dishes: dishReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    user: userReducer,
    dishes: dishReducer,
  },
})

export default store
