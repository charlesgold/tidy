module.exports = function(grunt) {
	//custom vars


  //Initializing the configuration object
    grunt.initConfig({
    		//this variable can be used to ready variables from package.json file.
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
						//too add more LESS files edit import of app.less
						//this will also allow you to maintain hierarchy for load
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
			,'string-replace': {
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
			,watch: {
				scripts: {
					files: ['app/js/*.js','app/styles/**/*.less','!app/styles/app.less']
					,tasks: ['concat','less:main','copy:main']
					,options: {
						//event: ['added','changed','deleted']
					}
				}
			}
			,open : {
			    all : {
			      path: 'http://127.0.0.1:8080/app.htm',
			      //app: 'Google Chrome'
			    }
			 }			
			,express: {
				all: {
					options: {
						port: 8080
						,bases: 'dist'
						,hostname: "127.0.0.1"
						,livereload: true					
						}
				}
				,dev: {
					options: {
						port: 8080
						,bases: 'app'
						,hostname: "127.0.0.1"
						,livereload: true					
						}
				}
			}


    });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express');


  // Task definition
  //grunt.registerTask('default', ['watch']);
  grunt.registerTask('default',"Run APP in Development mode", ['concat','less:main','copy:main']);
  grunt.registerTask('dist',"Run APP in Dist mode", ['concat','less:main', 'copy:dist', 'uglify']);
  
  grunt.registerTask('server-dist-start','start server',['express:all','open','watch']);
  //Dev
  grunt.registerTask('server-dev-start','start server',['express:dev','open','watch']);
  
    
  //Development Server Task
  grunt.registerTask('server-dev','Run webserver for Development...',function(){
  		console.log('Concat	- combining all JS files...');
		console.log('LESS	- compile LESS to CSS...');
		console.log('Copy	- copying font files');
		
		grunt.task.run('default');	
		
		console.log('Starting Express web server on port 8080...');
		console.log('Opening ...app/app.htm');
		console.log('Watch started...');
		
		grunt.task.run('server-dev-start');	  				
  });
  
  //Distribution Server Task
  grunt.registerTask('server-dist','Run webserver for Distribution...',function(){
  		console.log('Concat	- combining all JS files...');
		console.log('LESS	- compile LESS to CSS...');
		console.log('Copy	- copying font files');
		
		grunt.task.run('dist');	
		
		console.log('Starting Express web server on port 8080...');
		console.log('Opening ...dist/app.htm');
		console.log('Watch started...');
		
		grunt.task.run('server-dist-start');	  				
  });

};