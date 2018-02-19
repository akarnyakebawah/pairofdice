/* @flow */
import config from "../config";
import request from "./";

import User from "../_models/User";

export default class UserService {
  static url = `${config.API_URL}users/`;

  static async postUser(user: User): any {
    const { username, name, birthDate, email, password } = user;
    return request.post(UserService.url).send({
      username,
      name,
      birth_date: birthDate,
      email,
      password
    });
  }
}
