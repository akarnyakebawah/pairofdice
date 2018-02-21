import config from "../config";
import request, { baseUrl } from "./";

import Campaign from "../models/Campaign";

export default class CampaignService {
  static campaignsUrl = (campaignUrl = "") =>
    baseUrl(`campaigns/${campaignUrl}`);

  static async postCampaign(campaign: Campaign): Promise {
    const { captions, name, image, url } = campaign;
    const { campaignsUrl } = CampaignService;
    return request
      .post(campaignsUrl())
      .field("campaign_url", url)
      .field("name", name)
      .field("twibbon_img", image)
      .field("captions", captions);
  }

  static async getCampaign(campaign: Campaign): Promise {
    const { campaignsUrl } = CampaignService;
    const { campaignUrl } = campaign;
    return request.get(campaignsUrl(campaignUrl));
  }
}
