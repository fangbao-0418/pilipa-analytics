var gulp = require('gulp')
const rimraf = require('rimraf')
var gulpSequence = require('gulp-sequence')
var babel = require('gulp-babel')

// gulp.task('dist', function (done) {
//   rimraf.sync('./dist')
//   const webpackConfig = require('./webpack.prod.config')
//   webpack(webpackConfig, (err, stats) => {
//     if (err) {
//       console.error(err.stack || err)
//       if (err.details) {
//         console.error(err.details)
//       }
//       return
//     }

//     const info = stats.toJson()

//     if (stats.hasErrors()) {
//       console.error(info.errors)
//     }

//     if (stats.hasWarnings()) {
//       console.warn(info.warnings)
//     }

//     const buildInfo = stats.toString({
//       colors: true,
//       children: true,
//       chunks: false,
//       modules: false,
//       chunkModules: false,
//       hash: false,
//       version: false
//     })
//     done(0)
//   })
// })

// 编译ts
gulp.task('ts', function (cb) {
  var ts = require('gulp-typescript')
  var tsProject = ts.createProject('tsconfig.json', {
    declaration: true
  })
  gulp.src('src/**/*.ts?(x)')
    .pipe(tsProject())
    .pipe(gulp.dest('libs'))
    .on('end', cb)
})
gulp.task('copy', function (cb) {
  gulp.src(['src/**/*.d.ts', 'src/**/*.js'])
    .pipe(gulp.dest('libs'))
    .on('end', cb)
})

// 编译js
gulp.task('js', function (cb) {
  gulp.src(['libs/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('libs'))
    .on('end', cb)
})
gulp.task('libs', function (cb) {
  rimraf.sync('libs')
  gulpSequence('ts', 'copy', 'js', cb)
})
