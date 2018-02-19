import config from "../config";
import request, { baseUrl } from "./";

import Campaign from "../_models/Campaign";

export const campaignsUrl = (campaignUrl = "") =>
  baseUrl(`campaigns/${campaignUrl}`);

export default class CampaignService {
  static async postCampaign(campaign: Campaign): Promise {
    const { captions, name, image, url } = campaign;
    return request
      .post(campaignsUrl())
      .field("campaign_url", url)
      .field("name", name)
      .field("twibbon_img", image)
      .field("captions", captions);
  }

  static async getCampaign(campaign: Campaign): Promise {
    const { campaignUrl } = campaign;
    return request.get(campaignsUrl(campaignUrl));
  }
}
