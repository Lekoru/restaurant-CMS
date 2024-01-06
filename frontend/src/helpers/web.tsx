import axios from "axios";

const backendHost = "http://localhost:3001/api/";

export function login(data: any) {
  return new Promise((res, rej) => {
    axios
      .post(backendHost + `login`, {
        email: data.email,
        password: data.password
      })
      .then((result) => {
        res({ ...result.data, token: result.headers["x-auth-token"] });
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export function changePassword(data: { email: string , oldPassword: string, newPassword: string }) {
  return new Promise((res, rej) => {
    axios
      .patch(backendHost + `changePassword`, {
        email: data.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      })
      .then((result) => {
        res({ ...result.data });
      })
      .catch((err) => {
        rej(err);
      });
  });
}
