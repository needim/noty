module.exports = function(grunt) {
    grunt.initConfig({

        bump  : {
            options: {
                files             : ['package.json', 'noty.jquery.json', 'bower.json', 'js/noty/jquery.noty.js'],
                updateConfigs     : [],
                commit            : false,
                commitMessage     : 'Release v%VERSION%',
                commitFiles       : ['-a'],
                createTag         : true,
                tagName           : 'v%VERSION%',
                tagMessage        : 'Version %VERSION%',
                push              : false,
                pushTo            : 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },
        concat: {
            dist: {
                src : ['js/noty/jquery.noty.js', 'js/noty/layouts/*.js', 'js/noty/themes/*.js'],
                dest: 'js/noty/packaged/jquery.noty.packaged.js'
            }
        },

        uglify: {
            options : {
                preserveComments: function(a) {
                    return !!(a.start.file == 'js/noty/jquery.noty.js' && a.start.line == 11);
                }
            },
            minifyJS: {
                files: {
                    'js/noty/packaged/jquery.noty.packaged.min.js': ['js/noty/jquery.noty.js', 'js/noty/layouts/*.js', 'js/noty/themes/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('build', ['bump', 'concat', 'uglify:minifyJS']);
    grunt.registerTask('conc', ['concat']);
    grunt.registerTask('ugly', ['uglify:minifyJS']);
};
