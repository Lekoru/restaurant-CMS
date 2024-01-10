import axios from 'axios'
import { loadFromLocal } from './storage'
import { NewUserProps, webSettingsProps } from './types'

const backendHost = 'http://localhost:3001/api/'
const localUserData = loadFromLocal('emauth')

/*     User routes     */
export function login(data: { Email: string; Password: string }) {
  const { Password, Email } = data
  return new Promise((res, rej) => {
    axios
      .post(backendHost + `login`, {
        Email,
        Password,
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
  const { Email, Password, Role, Name } = data
  return new Promise((res, rej) => {
    axios
      .post(
        backendHost + `createUser`,
        {
          Name,
          Email,
          Password,
          Role,
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
  oldPassword: string
  newPassword: string
}) {
  const { oldPassword, newPassword } = data
  return new Promise((res, rej) => {
    axios
      .patch(
        backendHost + `changePassword`,
        {
          oldPassword,
          newPassword,
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
  const Res = await axios.get(backendHost + `getUsers`, {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localUserData.token,
    },
  })
  return Res.data
}

export function removeUser(userToDelete: string) {
  return new Promise((res, rej) => {
    axios
      .delete(backendHost + `deleteUser`, {
        headers: {
          userToDelete,
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

/*     Web Settings routes     */

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
  const { MainPhoto, MainTitle, MainDesc, RestaurantDesc } = webSettings
  return new Promise((res, rej) => {
    axios
      .patch(
        backendHost + 'changeWebSettings',
        { MainPhoto, MainTitle, MainDesc, RestaurantDesc },
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
