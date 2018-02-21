/* @flow */
import config from "../config";
import request from "./";

export function HelpersService() {
  const helperImagesUrl = () => `${config.API_URL}helper/images/`;

  const resizeImageBasePath = "https://twiggsy.imgix.net/";

  // const resizeImageQueryParams = "?fit=clip&h=1024&w=1024";

  const overlayImageQueryParams = (campaignUrl, x, y, width, height) =>
    `?rect=${x},${y},${width},${height}&mark=${campaignUrl}&markscale=100&markpad=0`;

  const overlayImageQuery = (
    relativeImagePath: string,
    campaignUrl: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) =>
    `${resizeImageBasePath}${relativeImagePath}${overlayImageQueryParams(
      campaignUrl,
      x,
      y,
      width,
      height
    )}`;

  async function getImage(imageUrl: string): Promise<any> {
    return request.get(imageUrl).withCredentials();
  }

  async function uploadImage(imageFile: File): Promise<any> {
    const formData = new FormData();
    formData.append("img", imageFile, imageFile.name);
    return request.post(helperImagesUrl()).send(formData);
  }

  return {
    overlayImageQuery,
    getImage,
    uploadImage
  };
}
