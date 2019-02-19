const postCssImport = require('postcss-import')
const extend = require('postcss-extend-rule')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const cssnext = require('postcss-cssnext')
const mixins = require('postcss-mixins')
const cssnano = require('cssnano')
const math = require('postcss-math')

module.exports = {
	plugins: [postCssImport, extend, precss, cssnext, mixins, cssnano, math],
}
