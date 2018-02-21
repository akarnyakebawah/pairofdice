/* @flow */
import config from "../config";
import request from "./";

import { User } from "models/";

export function UserService() {
  const userUrl = () => `${config.API_URL}users/`;

  async function postUser(user: User): any {
    const { username, name, birthDate, email, password } = user;
    return request.post(userUrl()).send({
      username,
      name,
      birth_date: birthDate,
      email,
      password
    });
  }

  return {
    url: {
      userUrl
    },
    postUser
  };
}
