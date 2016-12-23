'use strict';

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    rigger      = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    prettify    = require('gulp-jsbeautifier'),
    download    = require("gulp-download-stream");

var path = {
  build: { // production
    html: './'
  },
  src  : { // development
    html: 'src/*.html'
  },
  watch: {
    html: 'src/**/*.html'
  }
};

/* =====================================================
 SERVER
 ===================================================== */

var config = {
  server      : {
    baseDir: "./"
  },
  tunnel      : false,
  host        : 'localhost',
  port        : 9000,
  logPrefix   : "NOTY_DOCS",
  open        : false,
  watchTask   : true,
  rewriteRules: [
    {
      match: /"(\/noty\/)/g,
      fn   : function (req, res, match) {
        return '"/';
      }
    }
  ]
};

gulp.task('webserver', function () {
  browserSync(config);
});


/* =====================================================
 HTML
 ===================================================== */

gulp.task('html:build', function () {
  return gulp.src(path.src.html)
      .pipe(rigger())
      .pipe(prettify())
      .pipe(gulp.dest(path.build.html))
      ;
});

/* =====================================================
 RELEASES
 ===================================================== */

gulp.task('download:releases', function () {
  return download("https://api.github.com/repos/needim/noty/releases", {
    headers: {
      'User-Agent': 'NOTY Documentation Page'
    }
  })
      .pipe(gulp.dest(path.build.html))
      ;
});

/* =====================================================
 BUILD TASK
 ===================================================== */

gulp.task('build', ['html:build']);


/* =====================================================
 WATCH
 ===================================================== */

gulp.task('watch', function () {
  watch([path.watch.html], function (event, cb) {
    gulp.start('html:build');
  });
});


/* =====================================================
 DEFAULT TASK
 ===================================================== */

gulp.task('default', ['build', 'download:releases', 'webserver', 'watch']);