'use strict'

const gulp = require('gulp')
const watch = require('gulp-watch')
const rigger = require('gulp-rigger')
const browserSync = require('browser-sync')
const prettify = require('gulp-jsbeautifier')
const download = require('gulp-download-stream')
const rename = require('gulp-rename')
const jsonTransform = require('gulp-json-transform')
const Showdown = require('showdown')

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
    .pipe(rename('releases.json'))
    .pipe(gulp.dest(path.build.html))
})

const issueLinker = {
  type: 'lang',
  regex: '#[0-9]+',
  replace: function (match, prefix, content) {
    return '<a class="imp issue" target="_blank" href="https://github.com/needim/noty/issues/' + match.substr(1) + '">' + match + '</a>'
  }
}

gulp.task('html:releases', ['download:releases'], () => {
  return gulp.src('./releases.json')
    .pipe(jsonTransform((data, file) => {
      const convertor = new Showdown.Converter({
        extensions: [issueLinker],
        tasklists: true,
        simpleLineBreaks: true,
        ghMentions: true
      })
      let html = '<ul>'
      data.forEach((issue, i) => {
        let entry = '\n\t<li>\n\t\t<h3>' + issue.tag_name + '</h3>'
        entry += convertor.makeHtml(issue.body)
        entry += '\n\t</li>'
        html += entry
      })

      html += '\n</ul>'
      return html
    }))
    .pipe(rename('releases.html'))
    .pipe(gulp.dest('./src/template'))
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

gulp.task('default', ['html:releases', 'build', 'webserver', 'watch'])