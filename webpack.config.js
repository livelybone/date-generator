const path = require('path');
const fs = require('fs');

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
    filename: `./${item.name}.js`,
    library: 'index' === item.name ? 'DateGenerator' : `${item.name}DateGenerator`,
    libraryTarget: 'umd',
    globalObject: 'this',
  },
}));

module.exports = config;
