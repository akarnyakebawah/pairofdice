import defaults from "superagent-defaults";
import config from "../config";

export const request = defaults();

export const baseUrl = uri => `${config.API_URL}${uri}`;

export * from "./auth";
export * from "./campaign";
export * from "./user";
export * from "./twibbon";
export * from "./helpers";

export default request;
