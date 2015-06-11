module.exports = function (grunt) {
	grunt.registerTask('build', [
		'compileAssets',
		'linkAssetsBuild',
		'clean:build',
		'webpack:build',
		'copy:build'
	]);
};
