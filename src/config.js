const config = {
  production: {
    API_URL: "https://api.twiggsy.com/v1/",
    WEB_URL: "https://twiggsy.com/"
  },
  development: {
    API_URL: "https://api.twiggsy.com/v1/",
    WEB_URL: "https://twiggsy.com/"
  },
  local: {
    API_URL: "http://localhost:4000/",
    WEB_URL: "http://localhost:3220/"
  }
};

export default config[process.env.NODE_ENV || "development"];
