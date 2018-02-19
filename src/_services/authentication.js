/* @flow */

import config from "../config";
import request, { baseUrl } from "./";

import User from "../_models/User";

export const authenticationUrl = () => baseUrl("auth/");

export default class AuthenticationService {
  static setAuthorizationToken(token?: string | null): void {
    request.set("Authorization", token);
  }

  static async login(user: User): Promise {
    return request.post(authenticationUrl()).send(user);
  }
}
