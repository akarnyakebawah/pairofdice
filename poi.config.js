module.exports = (options, req) => ({
  entry: 'src/index.jsx',
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  html: {
    // `pkg` indicates the data in `package.json`
    title: 'Twiggsy',
  },
  port: 3220,
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
});
