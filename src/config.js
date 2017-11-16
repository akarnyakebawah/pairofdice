const config = {
  production: {
    API_URL: 'https://api.twiggsy.com',
  },
  development: {
    API_URL: 'http://twiggsy.herokuapp.com',
  },
  local: {
    API_URL: 'http://localhost:4000',
  },
};

export default config[process.env.NODE_ENV || 'development'];
