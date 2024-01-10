import { createSlice } from '@reduxjs/toolkit'
import { getMenu } from '../../helpers/web.tsx'
import { saveToLocal } from '../../helpers/storage.tsx'
import { DishState } from '../../helpers/types.tsx'

const initialState: DishState = {
  dishesList: [],
}

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    setDishesList: (state, action) => {
      state.dishesList = action.payload
    },
  },
})

export const { setDishesList } = dishesSlice.actions

export const getDishesList = () => async (dispatch: any) => {
  const res = await getMenu()
  if (res && 'menuList' in res && res.menuList.length >= 1) {
    {
      saveToLocal(res.menuList, 'dishesList')
      dispatch(setDishesList(res.menuList))
    }
  }
}

export default dishesSlice.reducer
