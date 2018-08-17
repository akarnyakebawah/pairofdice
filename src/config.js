const config = {
  production: {
    API_URL: "https://api.twiggsy.com/v1/",
    WEB_URL: "https://twiggsy.com/"
  },
  development: {
    API_URL: "http://206.189.33.89/v1/",
    WEB_URL: "http://206.189.33.89:3220/"
  },
  local: {
    API_URL: "http://localhost:8000/v1/",
    WEB_URL: "http://localhost:3000/"
  }
};

//export default config[process.env.NODE_ENV || "development"];
export default config["development"];
