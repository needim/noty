module.exports = function (grunt) {
	grunt.initConfig({

		concat: {
			dist: {
				src: ['js/noty/jquery.noty.js', 'js/noty/layouts/*.js', 'js/noty/themes/*.js'],
				dest: 'js/noty/packaged/jquery.noty.packaged.js'
			}
		},

		uglify: {
			minifyJS: {
				files: {
					'js/noty/packaged/jquery.noty.packaged.min.js': ['js/noty/jquery.noty.js', 'js/noty/layouts/*.js', 'js/noty/themes/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('build', ['concat', 'uglify:minifyJS']);
};
