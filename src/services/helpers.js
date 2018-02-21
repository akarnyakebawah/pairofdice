/* @flow */
import config from "../config";
import request from "./";

import Twiggsy from "../models/Twiggsy";
import TwiggsyService from "./twiggsy";

export default class HelpersService {
  static helperImagesUrl = () => `${config.API_URL}/helpers/images/`;

  static resizeImageBasePath = "https://twiggsy.imgix.net/";

  static resizeImageQueryParams = "?fit=clip&h=1024&w=1024";

  static overlayImageQueryParams = (campaignUrl, x, y, width, height) =>
    `?rect=${x},${y},${width},${height}&mark=${campaignUrl}&markscale=100&markpad=0`;

  static resizeImageQuery = relativeImagePath =>
    `${HelpersService.resizeImageBasePath}${relativeImagePath}${
      HelpersService.resizeImageQueryParams
    }`;

  static overlayImageQuery = (
    relativeImagePath,
    campaignUrl,
    x,
    y,
    width,
    height
  ) =>
    `${
      HelpersService.resizeImageBasePath
    }${relativeImagePath}${HelpersService.overlayImageQueryParams(
      campaignUrl,
      x,
      y,
      width,
      height
    )}`;

  static async getImage(imageUrl: string): Promise<any> {
    return request.get(imageUrl).withCredentials();
  }

  static async postTwibbon(twiggsy: Twiggsy): Promise<Twiggsy> {
    const { image, caption, campaignUrl } = twiggsy;
    return request
      .post(TwiggsyService.twiggsyUrl(campaignUrl))
      .field("caption", caption)
      .field("img", image);
  }

  static async uploadImage(files: { imageFile: File }): Promise<any> {
    const { imageFile } = files;
    const formData = new FormData();
    formData.append("img", imageFile, imageFile.name);
    return request.post(TwiggsyService.helperImagesUrl()).send(formData);
  }
}
