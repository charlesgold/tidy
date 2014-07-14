module.exports = function(grunt) {
	//custom vars


  //Initializing the configuration object
    grunt.initConfig({
			pkg: grunt.file.readJSON('package.json')
			  // Task configuration
			//setup files from vendor that need to be copied to appropriate directory
			
			,concat: {
				options: {
							separator: ';'
							,footer: '//tiny-eco.com'
				}
				,js: {
					//need to add Jquery and bootstrap
					src: [
						'app/js/*.js'
					]
					,dest: 'app/app.js'
				}
			}			
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
				,dist: {
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
								expand: true
								,cwd: 'app/'
								,src: ['app.css']
								,dest: 'dist/assets/'
								,flatten:true
								,filter: 'isFile'
								
							 }
							 							 	
					]

				}
			}
			,less: {
				main: {
					options: {
						compress: true
					}
					,files: {
						'app/app.css' : 'app/styles/app.less'
					}
				}
			}
			,uglify: {
				options: {
					mangle: false
					,footer: '//app.js compressed'
				}
				,dist : {
					files : {
						'dist/assets/app.js' : ['app/app.js']
					}
				}
			}


    });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-phpunit');

  // Task definition
  //grunt.registerTask('default', ['watch']);
  grunt.registerTask('default',"Run APP in Development mode", ['concat','less:main','copy:main']);
  grunt.registerTask('dist',"Run APP in Dist mode", ['concat','less:main', 'copy:dist', 'uglify']);

};