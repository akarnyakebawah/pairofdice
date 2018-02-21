/* @flow */
import request, { baseUrl } from "../";

import { Twibbon } from "models/";

export function createTwibbonService() {
  const twibbonsUrl = (campaignUrl = "") => baseUrl(`twibbons/${campaignUrl}/`);

  async function postTwibbon(twibbon: Twibbon) {
    const { image, caption, campaignUrl } = twibbon;
    return request
      .post(twibbonsUrl(campaignUrl))
      .field("caption", caption)
      .field("img", image);
  }

  return {
    url: {
      twibbonsUrl
    },
    postTwibbon
  };
}
