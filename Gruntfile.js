module.exports = function (grunt) {
  'use strict'

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    usebanner: {
      taskName: {
        options: {
          position: 'top',
          banner: '/* \n  @package NOTY - Dependency-free notification library \n' +
          '  @version version: <%= pkg.version %> \n' +
          '  @contributors https://github.com/needim/noty/graphs/contributors \n' +
          '  @documentation Examples and Documentation - http://needim.github.com/noty \n' +
          '  @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php \n*/\n',
          linebreak: true
        },
        files: {
          src: ['lib/noty.js', 'lib/noty.min.js']
        }
      }
    },
    qunit: {
      options: {
        inject: 'test/unit/phantom.js'
      },
      files: 'test/index.html'
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },
    'saucelabs-qunit': {
      all: {
        options: {
          testname: 'Noty <%= pkg.version %>',
          concurrency: 10,
          maxRetries: 3,
          maxPollRetries: 4,
          urls: ['http://127.0.0.1:3000/test/index.html?hidepassed'],
          browsers: [ // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
            { // macOS
              'browserName': 'safari',
              'platform': 'OS X 10.11'
            },
            {
              'browserName': 'chrome',
              'platform': 'OS X 10.11',
              'version': 'latest'
            },
            {
              'browserName': 'firefox',
              'platform': 'OS X 10.11',
              'version': 'latest'
            },
            { // windows
              'browserName': 'MicrosoftEdge',
              'platform': 'Windows 10',
              'version': 'latest'
            },
            {
              'browserName': 'chrome',
              'platform': 'Windows 10',
              'version': 'latest'
            },
            {
              'browserName': 'firefox',
              'platform': 'Windows 10',
              'version': 'latest'
            },
            {
              'browserName': 'internet explorer',
              'version': '11',
              'platform': 'Windows 8.1'
            },
            {
              'browserName': 'internet explorer',
              'version': '10',
              'platform': 'Windows 8'
            },
            { // linux
              'browserName': 'chrome',
              'platform': 'Linux',
              'version': 'latest'
            },
            {
              'browserName': 'firefox',
              'platform': 'Linux',
              'version': 'latest'
            },
            {
              'browserName': 'opera',
              'platform': 'Linux',
              'version': 'latest'
            }
          ]
        }
      }
    }
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('banner', 'usebanner')
  grunt.registerTask('test', 'qunit')
  grunt.registerTask('saucelabs', ['qunit', 'connect', 'saucelabs-qunit'])
  grunt.registerTask('default', ['test'])
}
