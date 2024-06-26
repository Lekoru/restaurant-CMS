import { createSlice } from '@reduxjs/toolkit'
import { get_users } from '../../helpers/web.tsx'
import { UserState } from '../../helpers/types.tsx'

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
    dispatch(setUsersList(data.usersList))
  }
}

export default userSlice.reducer
