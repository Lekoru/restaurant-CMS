export interface NewUserProps {
  Name: string
  Email: string
  Password: string
  Role: 'Admin' | 'User'
}

export const initNewUserConfig: NewUserProps = {
  Name: '',
  Email: '',
  Password: '',
  Role: 'User',
}

export interface usersListConf {
  id: number
  Name: string
  Email: String
  Role: String
}

export interface UserState {
  usersList: usersListConf[]
}

export interface webSettingsProps {
  MainPhoto: string
  MainTitle: string
  MainDesc: string
  RestaurantDesc: string
}
export const initWebSettings: webSettingsProps = {
  MainPhoto: '',
  MainTitle: '',
  MainDesc: '',
  RestaurantDesc: '',
}

export interface NewDishProps {
  DishName: string
  DishDesc: string
  Ingredients: string
  Photo: string
  Price: number | undefined
  id?: number
}

export interface DishState {
  dishesList: NewDishProps[]
}

export const initNewDishProps = {
  DishName: '',
  DishDesc: '',
  Ingredients: '',
  Photo: '',
  Price: 0,
}
