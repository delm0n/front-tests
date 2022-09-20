const {src, dest, watch} = require('gulp')
const CompileSass = require('gulp-sass')(require('sass'))

CompileSass.compiler = require('node-sass')

const bundleSass =() => {
    return src('./scss/**/*.scss')
    .pipe(CompileSass().on('error', CompileSass.logError))
    .pipe(dest('./css/'))
}

const devWatch =() => {
    watch('./scss/**/*.scss', bundleSass)
}

exports.bundleSass = bundleSass;
exports.devWatch = devWatch;