module.exports = function(grunt) {
	//custom vars


  //Initializing the configuration object
    grunt.initConfig({
			pkg: grunt.file.readJSON('package.json')
			  // Task configuration
			//setup files from vendor that need to be copied to appropriate directory
			
			//Concatinate JavaScript files in directories specified
			,concat: {
				options: {
							separator: ';'
							,footer: '//tiny-eco.com'
				}
				,js: {
					//need to add Jquery and bootstrap
					src: [
						'app/js/*.js'
						,'vendor/jquery/dist/jquery.js'
						,'vendor/bootstrap/dist/bootstrap.js'
						,'vendor/handlebars/handlebars.js'
					]
					,dest: 'app/assets/app.js'
				}
			}
			//Copy tasks for dev and dist			
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
								,cwd: 'app/assets'
								,src: ['app.css']
								,dest: 'dist/assets/'
								,flatten:true
								,filter: 'isFile'								
							 }
							 ,{
								expand: true
								,cwd: 'app/assets'
								,src: ['app.js']
								,dest: 'dist/assets/'
								,flatten:true
								,filter: 'isFile'								
							 }							 
							 ,{
								expand: true
								,cwd: 'app/'
								,src: ['app.htm']
								,dest: 'dist/'
								,flatten:true
								,filter: 'isFile'								
							 }					
							 							 	
					]

				}
			}
			//Compiles LESS files to CSS
			,less: {
				main: {
					options: {
						compress: true
					}
					,files: {
						'app/assets/app.css' : 'app/styles/app.less'
					}
				}
			}
			//Uglify - minify files specified
			,uglify: {
				options: {
					mangle: false
					,footer: '//app.js compressed'
				}
				,dist : {
					files : {
						'dist/assets/app.js' : ['app/assets/app.js']
					}
				}
			}
			//Can be used to replace string in files
			,replaceIncludes: {
				dev: {
					files: {
						'path/dest': 'path/source'
					},
					options: {
						replacements: [
								{
									pattern: ''
									,replacement: ''
								}
						]
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
  grunt.loadNpmTasks('grunt-string-replace');
  //grunt.loadNpmTasks('grunt-phpunit');

  // Task definition
  //grunt.registerTask('default', ['watch']);
  grunt.registerTask('default',"Run APP in Development mode", ['concat','less:main','copy:main']);
  grunt.registerTask('dist',"Run APP in Dist mode", ['concat','less:main', 'copy:dist', 'uglify']);

};