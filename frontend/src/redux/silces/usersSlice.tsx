import { createSlice } from '@reduxjs/toolkit'
import { get_users } from '../../helpers/web'
import { saveToLocal } from '../../helpers/storage'

export interface usersListConf {
  id: number
  Name: string
  Email: String
  Role: String
}

interface UserState {
  usersList: usersListConf[]
}

const initialState: UserState = {
  usersList: [],
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersList: (state, action) => {
      state.usersList = action.payload
    },
  },
})

export const { setUsersList } = userSlice.actions

export const getUsersList = () => async (dispatch: any) => {
  const data = await get_users()
    .then(res => res)
    .catch(e => console.error(e))
  if (data && data.usersList.length >= 1) {
    saveToLocal(data.usersList, 'usersList')
    dispatch(setUsersList(data.usersList))
  }
}

export default userSlice.reducer
