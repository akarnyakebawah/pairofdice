import defaults from 'superagent-defaults';
import * as apiUrl from '../constants/apiUrl';

export const request = defaults();
loadAuthorizationToken();

export function loadAuthorizationToken() {
  const token = localStorage.getItem('authenticationToken');
  if (!token) {
    request.set('Authentication', token);
  }
}

export async function login(email, password) {
  return request.post(apiUrl.auth()).send({ email, password });
}
