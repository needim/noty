module.exports = function(grunt) {
    grunt.initConfig({

        bump  : {
            options: {
                files             : ['package.json', 'noty.jquery.json', 'bower.json', 'js/noty/jquery.noty.js'],
                updateConfigs     : [],
                commit            : false,
                commitMessage     : 'Release v%VERSION%',
                commitFiles       : ['-a'],
                createTag         : false,
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

        wrap: {
            basic: {
                src: 'js/noty/packaged/jquery.noty.packaged.js',
                dest: 'js/noty/packaged/jquery.noty.packaged.js',
                options: {
                    wrapper: ["!function(root, factory) {\n\t if (typeof define === 'function' && define.amd) {\n\t\t define(['jquery'], factory);\n\t } else if (typeof exports === 'object') {\n\t\t module.exports = factory(require('jquery'));\n\t } else {\n\t\t factory(root.jQuery);\n\t }\n}(this, function($) {\n", "\nreturn window.noty;\n\n});"]
                }
            }
        },

        uglify: {
            //options : {
            //    preserveComments: function(a) {
            //        return !!(a.start.file == 'js/noty/jquery.noty.js' && a.start.line == 11);
            //    }
            //},
            minifyJS: {
                files: {
                    'js/noty/packaged/jquery.noty.packaged.min.js': ['js/noty/packaged/jquery.noty.packaged.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-release-component');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-wrap');

    grunt.registerTask('build', ['bump', 'concat', 'wrap', 'uglify:minifyJS']);
    grunt.registerTask('conc', ['concat', 'wrap']);
    grunt.registerTask('ugly', ['uglify:minifyJS']);
};
