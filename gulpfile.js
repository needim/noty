'use strict'

const gulp = require('gulp')
const watch = require('gulp-watch')
const rigger = require('gulp-rigger')
const browserSync = require('browser-sync')
const prettify = require('gulp-jsbeautifier')
const download = require('gulp-download-stream')

const path = {
  build: { // production
    html: './'
  },
  src: { // development
    html: 'src/*.html'
  },
  watch: {
    html: 'src/**/*.html'
  }
}

/* =====================================================
 SERVER
 ===================================================== */
const config = {
  server: {
    baseDir: './'
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: 'NOTY_DOCS',
  open: false,
  watchTask: true,
  rewriteRules: [
    {
      match: /"(\/noty\/)/g,
      fn: (req, res, match) => {
        return '"/'
      }
    }
  ]
}

gulp.task('webserver', () => {
  browserSync(config)
})

/* =====================================================
 HTML
 ===================================================== */

gulp.task('html:build', () => {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(prettify())
    .pipe(gulp.dest(path.build.html))

})

/* =====================================================
 RELEASES
 ===================================================== */

gulp.task('download:releases', () => {
  return download('https://api.github.com/repos/needim/noty/releases', {
    headers: {
      'User-Agent': 'NOTY Documentation Page'
    }
  })
    .pipe(gulp.dest(path.build.html))

})

/* =====================================================
 BUILD TASK
 ===================================================== */

gulp.task('build', ['html:build'])

/* =====================================================
 WATCH
 ===================================================== */

gulp.task('watch', () => {
  watch([path.watch.html], (event, cb) => {
    gulp.start('html:build')
  })
})

/* =====================================================
 DEFAULT TASK
 ===================================================== */

gulp.task('default', ['build', 'download:releases', 'webserver', 'watch'])