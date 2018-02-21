/* @flow */

import config from "../config";
import request, { baseUrl } from "./";

import User from "../models/User";

export default class AuthenticationService {
  static authenticationUrl = () => baseUrl("auth/");

  static setAuthorizationToken(token?: string | null): void {
    request.set("Authorization", token);
  }

  static async login(user: User): Promise<User> {
    const { authenticationUrl } = AuthenticationService;
    return request.post(authenticationUrl()).send(user);
  }
}
