import defaults from 'superagent-defaults';
import * as apiUrl from '../constants/apiUrl';

export const request = defaults();

export function setAuthorizationToken(token) {
  request.set('Authorization', `JWT ${token}`);
}

export async function login({ email, password }) {
  return request.post(apiUrl.auth()).send({ email, password });
}

export async function register({ name, birthDate, email, password }) {
  return request.post(apiUrl.user()).send({
    name,
    birth_date: birthDate,
    email,
    password,
  });
}

export async function postCampaign({ captions, name, image, url }) {
  return request
    .post(apiUrl.campaigns())
    .field('campaign_url', url)
    .field('name', name)
    .field('twibbon_img', image)
    .field('captions', captions)
  ;
}

export async function getCampaign(campaignUrl) {
  return request.get(apiUrl.campaign(campaignUrl));
}
