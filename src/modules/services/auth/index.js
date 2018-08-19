/* @flow */

import request, { baseUrl } from "../";

import { User } from "models/";

export function createAuthService() {
  const authUrl = () => baseUrl("auth/");

  function setAuthorizationToken(token?: string | null): void {
    // console.log("Authorization gan ");
    request.set("Authorization", token);
  }

  /**
   * untuk melakukan authentikasi ke API
   * @param {*} user
   */
  async function login(user: User): Promise<User> {
    // console.log("user : ", user);
    // console.log("authUrl gan : ", authUrl());

    return request.post(authUrl()).send(user);
  }

  return {
    url: {
      authUrl
    },
    setAuthorizationToken,
    login
  };
}
