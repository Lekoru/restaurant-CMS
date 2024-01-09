import axios from 'axios'
import { loadFromLocal } from './storage'
import { webSettingsProps } from '../views'
import { NewUserProps } from '../components/UserDashboard/routes/admin'

const backendHost = 'http://localhost:3001/api/'
const localUserData = loadFromLocal('emauth')

{
  /*     User routes     */
}
export function login(data: any) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + `login`, {
        email: data.email,
        password: data.password,
      })
      .then(result => {
        res({ ...result.data })
      })
      .catch(err => {
        rej(err)
      })
  })
}

export function createUser(data: NewUserProps) {
  return new Promise((res, rej) => {
    axios
      .post(
        backendHost + `createUser`,
        {
          name: data.Name,
          email: data.Email,
          password: data.Password,
          role: data.Role,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localUserData.token,
          },
        },
      )
      .then(result => {
        res({ ...result.data })
      })
      .catch(err => {
        rej(err)
      })
  })
}

export function changePassword(data: {
  email: string
  oldPassword: string
  newPassword: string
}) {
  return new Promise((res, rej) => {
    axios
      .patch(
        backendHost + `changePassword`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localUserData.token,
          },
        },
      )
      .then(result => {
        res({ ...result.data })
      })
      .catch(err => {
        rej(err)
      })
  })
}

export async function get_users() {
  const response = await axios.get(backendHost + `getUsers`, {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localUserData.token,
    },
  })
  return response.data
}

export function removeUser(userToDelete: string) {
  return new Promise((res, rej) => {
    axios
      .delete(backendHost + `deleteUser`, {
        headers: {
          userToDelete: userToDelete,
          'auth-token': localUserData.token,
        },
      })
      .then(result => {
        res({ ...result.data })
      })
      .catch(err => {
        rej(err)
      })
  })
}

{
  /*     Web Settings routes     */
}

export function getWebSettings() {
  return new Promise((res, rej) => {
    axios
      .get(backendHost + 'getWebSettings')
      .then(result => res(result))
      .catch(err => {
        rej(err)
      })
  })
}
export function changeWebSettings(webSettings: webSettingsProps) {
  return new Promise((res, rej) => {
    axios
      .patch(
        backendHost + 'changeWebSettings',
        { ...webSettings },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localUserData.token,
          },
        },
      )
      .then(result => res(result))
      .catch(err => {
        rej(err)
      })
  })
}
