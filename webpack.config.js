const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getEntries() {
  const reg = /\.js$/;
  return fs.readdirSync(path.resolve(__dirname, './src'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src', filename)).isDirectory())
    .map(filename => ({
      name: filename.replace(reg, ''),
      filename: path.resolve(__dirname, './src', filename)
    }));
}

const config = getEntries().map(item => ({
  mode: 'production',
  entry: { index: item.filename },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: `./${item.name}.min.js`,
    library: 'index' === item.name ? 'DateGenerator' : `${item.name}DateGenerator`,
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src'),
        to: path.resolve(__dirname, './lib'),
        ignore: ['.*'],
      },
    ]),
  ]
}));

module.exports = config;
