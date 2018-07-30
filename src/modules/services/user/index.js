/* @flow */
import request, { baseUrl } from "../";

import { User } from "models/";

export function createUserService() {
  const userUrl = () => baseUrl("users/");

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
