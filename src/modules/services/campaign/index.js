import request, { baseUrl } from "../";

import { Campaign } from "models/";

export function createCampaignService() {
  const campaignsUrl = (campaignUrl = "") => baseUrl(`campaigns/${campaignUrl}`);

  async function postCampaign(campaign: Campaign): Promise<Campaign> {
    const { captions, name, image, url } = campaign;
    const formData = new FormData();
    formData.append("twibbon_img", image, image.name);
    formData.append("name", name);
    formData.append("caption_template", captions);
    formData.append("campaign_url", url);
    return request.post(campaignsUrl()).send(formData);
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
