module.exports = function(grunt) {
	//custom vars


  //Initializing the configuration object
    grunt.initConfig({
			pkg: grunt.file.readJSON('package.json')
			  // Task configuration
			//setup files from vendor that need to be copied to appropriate directory
			,copy:{
				main: {
					files: [
								{	
									expand: true
									,cwd: 'vendor/fontawesome/fonts/'
									,src: ['**']
									,dest: 'app/assets/fonts/'
									,flatten:true
									,filter: 'isFile'
								 }	
					]
				}
				,distribution: {
					files: [
							{	
								expand: true
								,cwd: 'app/assets/fonts'
								,src: ['**']
								,dest: 'dist/assets/fonts/'
								,flatten:true
								,filter: 'isFile'
							 }
							 ,{
								src: ['.app/*.js']
								,dest: "dist/assets" 
							 }	
					]

				}
			}

    });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-phpunit');

  // Task definition
  //grunt.registerTask('default', ['watch']);
  grunt.registerTask('default',"Run APP in Development mode", ['copy:main']);
  grunt.registerTask('dist',"Run APP in Dist mode", ['copy:distribution']);

};