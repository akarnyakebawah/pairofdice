const config = {
  production: {
    API_URL: 'https://api.twiggsy.com/',
  },
  development: {
    API_URL: 'http://twiggsy-api.herokuapp.com/api/v1/',
  },
  local: {
    API_URL: 'http://localhost:4000/',
  },
};

export default config[process.env.NODE_ENV || 'development'];
