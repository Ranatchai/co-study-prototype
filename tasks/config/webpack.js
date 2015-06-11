/**
 * For usage docs see:
 * 		https://github.com/webpack/grunt-webpack
 */
module.exports = function(grunt) {

	grunt.config.set('webpack', {
		dev: require('../../webpack.local.config'),
		build: require('../../webpack.build.config')
	});

	grunt.loadNpmTasks('grunt-webpack');
};