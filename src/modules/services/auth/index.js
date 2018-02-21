/* @flow */

import request, { baseUrl } from "../";

import { User } from "models/";

export function createAuthService() {
  const authUrl = () => baseUrl("auth/");

  function setAuthorizationToken(token?: string | null): void {
    request.set("Authorization", token);
  }

  async function login(user: User): Promise<User> {
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
