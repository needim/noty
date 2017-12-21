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
          '  @documentation Examples and Documentation - https://ned.im/noty \n' +
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
    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: 'file'
        },
        files: [{
          expand: true,
          cwd: 'src/themes',
          src: ['*.scss'],
          dest: 'lib/themes',
          ext: '.css'
        }]
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
  grunt.registerTask('themes', ['sass'])
}
