const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies

module.exports = {
 mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};