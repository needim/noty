module.exports = function (grunt) {
	grunt.initConfig({
		uglify: {
			minifyJS: {
				files: {
					'js/noty/jquery.noty.packaged.min.js': ['js/noty/jquery.noty.js', 'js/noty/layouts/*.js', 'js/noty/themes/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('build', ['uglify:minifyJS']);
};
