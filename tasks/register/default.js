module.exports = function (grunt) {
	grunt.registerTask('default', ['webpack:dev', 'compileAssets', 'linkAssets',  'watch']);
};
