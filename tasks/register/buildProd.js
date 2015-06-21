module.exports = function (grunt) {
	grunt.registerTask('buildProd', [		
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'linkAssetsBuildProd',
		'clean:build',
		'webpack:build',
		'copy:build'
	]);
};
