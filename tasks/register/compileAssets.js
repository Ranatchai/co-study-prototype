module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		'webpack:dev',
		'copy:dev',		
		'coffee:dev'
	]);
};
