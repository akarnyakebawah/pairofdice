import defaults from "superagent-defaults";
import config from "../config";
import * as apiUrl from "../constants/apiUrl";

export const request = defaults();
export const baseUrl = uri => `${config.API_URL}${uri}`;
export * from "./campaign";
export * from "./user";
export * from "./twiggsy";

export default request;
