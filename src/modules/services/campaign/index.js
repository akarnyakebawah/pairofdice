import request, { baseUrl } from "../";

import { Campaign } from "models/";

export function createCampaignService() {
  const campaignsUrl = (campaignUrl = "") => baseUrl(`campaigns/${campaignUrl}`);

  async function postCampaign(campaign: Campaign): Promise<Campaign> {
    const { captions, name, image, url } = campaign;
    return request
      .post(campaignsUrl())
      .field("campaign_url", url)
      .field("name", name)
      .field("twibbon_img", image)
      .field("captions", captions);
  }

  async function getCampaign(campaign: Campaign): Promise<Campaign> {
    const { campaignUrl } = campaign;
    return request.get(campaignsUrl(campaignUrl));
  }

  return {
    getCampaign,
    postCampaign,
    url: {
      campaignsUrl
    }
  };
}
