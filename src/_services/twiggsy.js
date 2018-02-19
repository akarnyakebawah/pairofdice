/* @flow */
import config from "../config";
import request, { baseUrl } from "./";

import Twiggsy from "../_models/Twiggsy";

export const twiggsiesUrl = (campaignUrl = "") =>
  baseUrl(`twibbons/${campaignUrl}/`);

export default class TwiggsyService {
  static async postTwibbon(twiggsy: Twiggsy) {
    const { image, caption, campaignUrl } = twiggsy;
    return request
      .post(twiggsiesUrl(campaignUrl))
      .field("caption", caption)
      .field("img", image);
  }
}
