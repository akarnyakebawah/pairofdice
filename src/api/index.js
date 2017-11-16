import defaults from 'superagent-defaults';
import * as apiUrl from '../constants/apiUrl';

export const request = defaults();

export function setRequestAuthorization(token) {
  request.set('Authorization', `JWT ${token}`);
}

export async function login() {
  return request.post();
}
