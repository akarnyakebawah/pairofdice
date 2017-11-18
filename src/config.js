const config = {
  production: {
    API_URL: 'http://api.twiggsy.com/api/v1/',
  },
  development: {
    API_URL: 'http://twiggsy-api.herokuapp.com/api/v1/',
  },
  local: {
    API_URL: 'http://localhost:4000/',
  },
};

export default config[process.env.NODE_ENV || 'development'];
