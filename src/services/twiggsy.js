/* @flow */
import config from "../config";
import request, { baseUrl } from "./";

import Twiggsy from "../models/Twiggsy";

export default class TwiggsyService {
  static twiggsiesUrl = (campaignUrl = "") =>
    baseUrl(`twibbons/${campaignUrl}/`);

  static async postTwibbon(twiggsy: Twiggsy) {
    const { twiggsiesUrl } = TwiggsyService;
    const { image, caption, campaignUrl } = twiggsy;
    return request
      .post(twiggsiesUrl(campaignUrl))
      .field("caption", caption)
      .field("img", image);
  }
}
