const config = {
  production: {
    API_URL: 'https://api.twiggsy.com/v1/',
  },
  development: {
    // API_URL: 'http://twiggsy-api.herokuapp.com/v1/',
    API_URL: 'https://api.twiggsy.com/v1/',
  },
  local: {
    API_URL: 'http://localhost:4000/',
  },
};

export default config[process.env.NODE_ENV || 'development'];
