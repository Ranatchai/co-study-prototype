module.exports = function (grunt) {
	grunt.registerTask('default', ['compileAssets', 'webpack:dev', 'linkAssets',  'watch']);
};
