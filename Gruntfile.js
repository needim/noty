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
    curl: {
      builds: {
        src: {
          url: 'https://www.browserstack.com/automate/builds.json',
          auth: {
            user: process.env.BROWSERSTACK_USERNAME,
            pass: process.env.BROWSERSTACK_KEY
          }
        },
        dest: 'browserstack-builds.json'
      },
      session: {
        src: {
          url: 'https://www.browserstack.com/automate/builds/' + grunt.file.readJSON('browserstack-builds.json')[0]['automation_build']['hashed_id'] + '/sessions.json',
          auth: {
            user: process.env.BROWSERSTACK_USERNAME,
            pass: process.env.BROWSERSTACK_KEY
          }
        },
        dest: 'browserstack-session.json'
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

  grunt.registerTask('bs-create-md', function () {
    const session = grunt.file.readJSON('browserstack-session.json')
    const file = 'docs/browsers.md'
    let contents = '!> This data is provided by BrowserStack Automate \n\n\n'

    contents += `#### ${session[0].automation_session.build_name} \n\n`
    contents += '| OS | Browser | Result | Details | \n'
    contents += '| --- | --- | --- | --- | \n'

    session.forEach(function (s) {
      grunt.log.writeln(s.automation_session.hashed_id)
      contents += `| ${s.automation_session.os} ${s.automation_session.os_version} | ${s.automation_session.browser} ${s.automation_session.browser_version}  | ${s.automation_session.status} | [view](${s.automation_session.public_url}) |`
      contents += '\n'
    })

    grunt.file.write(file, contents)
  })

  grunt.registerTask('browserstack-md', ['curl:builds', 'curl:session', 'bs-create-md'])
  grunt.registerTask('banner', 'usebanner')
  grunt.registerTask('test', 'qunit')
  grunt.registerTask('saucelabs', ['qunit', 'connect', 'saucelabs-qunit'])
  grunt.registerTask('default', ['test'])
}
