/* @flow */
import config from "../config";
import request from "./";

import User from "../models/User";

export default class UserService {
  static userUrl = () => `${config.API_URL}users/`;

  static async postUser(user: User): any {
    const { userUrl } = UserService;
    const { username, name, birthDate, email, password } = user;
    return request.post(userUrl()).send({
      username,
      name,
      birth_date: birthDate,
      email,
      password
    });
  }
}
