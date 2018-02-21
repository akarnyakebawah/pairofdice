/*
  All API endpoints are listed here
  Rules & Styleguides:
  ->  To list a new endpoints, create a new variable (variable name is noun),
  ->  Each variable must be exported,
  ->  Even though it doesn't need any params,
      for consistency each variable must be an arrow function.
  ->  Block each variables according to the pages.
  ->  VERY IMPORTANT: ALL ENDPOINTS MUST ENDS WITH EXTRA SLASH '/'
*/

// Config is used to determine the endpoint according to the current set NODE_ENV
import config from "../config";

// Base endpoints of the API
export const base = uri => config.API_URL + uri;

export const auth = () => base("auth/");

export const user = () => base("users/");

export const campaigns = () => base("campaigns/");

export const campaign = campaignUrl => `${campaigns() + campaignUrl}/`;

export const twibbon = campaignUrl => `${campaign(campaignUrl)}twibbons/`;

export const imageResizer = () => base("helper/images/");

export const resizeImageBasePath = () => "https://twiggsy.imgix.net/";

export const resizeImageQueryParams = () => "?fit=clip&h=1024&w=1024";

export const resizeImageQuery = relativeImagePath =>
  `${resizeImageBasePath()}${relativeImagePath}${resizeImageQueryParams()}`;

export const overlayImageQueryParams = (campaignUrl, x, y, width, height) =>
  `?rect=${x},${y},${width},${height}&mark=${campaignUrl}&markscale=100&markpad=0`;

export const overlayImageQuery = (
  relativeImagePath,
  campaignUrl,
  x,
  y,
  width,
  height
) =>
  `${resizeImageBasePath()}${relativeImagePath}${overlayImageQueryParams(
    campaignUrl,
    x,
    y,
    width,
    height
  )}`;
