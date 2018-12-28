const fs = require('fs')
const path = require('path')
const { uglify } = require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const license = require('rollup-plugin-license')
const formats = ['es', 'umd']

function getEntries() {
  const reg = /\.js$/
  return fs.readdirSync(path.resolve(__dirname, './src'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src', filename)).isDirectory())
    .map(filename => ({
      name: filename.replace(reg, ''),
      filename: path.resolve(__dirname, './src', filename),
      formats: formats.filter(f => f !== 'es')
    }))
}

const conf = entry => ({
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${format}/${entry.name}.js`,
    format,
    name: 'index' === entry.name ? 'DateGenerator' : `${entry.name}DateGenerator`,
  })),
  plugins: [
    resolve(),
    commonjs(),
    (entry.needUglify !== false && uglify()),
    license({
      banner: `Bundle of <%= pkg.name %>
               Generated: <%= moment().format('YYYY-MM-DD') %>
               Version: <%= pkg.version %>
               License: <%= pkg.license %>
               Author: <%= pkg.author %>`,
    }),
  ]
})

export default [
  { name: 'index', filename: './src/index.js', formats: ['es'], needUglify: false },
  ...getEntries()
].map(entry => conf(entry))
