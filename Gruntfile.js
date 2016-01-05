module.exports = function (grunt) {
	// time
	require('time-grunt')(grunt);
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		htmlmin: {                                     
	    dist: {                                      
	      options: {                                 
	        removeComments: true,
	        collapseWhitespace: true
	      },
	      expand: true,    
        cwd: 'parts/',      
        src: ['**/*.html'], 
        dest: 'parts/',   
	    }
	  },

		imagemin: {                          
			dynamic: {                         
			  files: [{
				expand: true,
                optimizationLevel: 5,
				cwd: './assets/images/',                   
				src: ['**/*.{png,jpg,gif}'],   
				dest: './assets/images/'                  
			  }]
			}
		},
		//not used
		clean: {
			options: { force: true },
			clean: ["../forte-prod"]
		},
		compress: {
		      main: {
		        options: {
		          archive: 'packaged/<%= pkg.name %>' + grunt.template.today('_yyyy-mm-dd_HH-MM') + '.zip',
							mode: 'zip'
		        },
		        expand: true,
		        cwd: '.',
		        src: [
							'**/*',
							'!**/node_modules/**',
							'!**/javascript/custom/**',
							'!**/components/**',
							'!**/scss/**',
							'!**/bower.json',
							'!**/Gruntfile.js',
							'!**/package.json',
							'!**/composer.json',
							'!**/composer.lock',
							'!**/codesniffer.ruleset.xml',
							'!**/packaged/*'
						],
		        dest: '<%= pkg.name %>'
		      },
		    },
		sass: {

			options: {
				// If you can't get source maps to work, run the following command in your terminal:
				// $ sass scss/foundation.scss:css/foundation.css --sourcemap
				// (see this link for details: http://thesassway.com/intermediate/using-source-maps-with-sass )
				sourceMap: true,
			},

			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'assets/stylesheets/foundation.css': 'assets/scss/foundation.scss'
				}
			}

		},
		
		coffee: {
			options: {
				//bare: true
			},
			compile: {
				files: {
				  'assets/javascript/custom/fromcoffee.js': ['assets/javascript/**/*.coffee'] 
				}
		   }
		},

		concat: {

			options: {
				separator: ';'
			},

			vendors: {
				src: [
					//'assets/components/foundation/js/vendor/*.js',
					'assets/components/jquery/jquery.min.js',
					'assets/components/modernizr/modernizr.js',
					'assets/components/slick-carousel/slick/slick.min.js',
					'assets/components/angular/angular.min.js',
					'assets/components/angular-messages/angular-messages.min.js',
					'assets/components/angular-animate/angular-animate.min.js',
					'assets/components/foundation-datepicker/js/foundation-datepicker.min.js',
					'assets/components/foundation-datepicker/js/locales/foundation-datepicker.ja.js'
				],

				dest: 'assets/javascript/vendor/vendors.js'
			},

			dist: {

				src: [

					// Foundation core
					'assets/components/foundation/js/foundation/foundation.js',

					// Pick the componenets you need in your project
					//'assets/components/foundation/js/foundation/foundation.abide.js',
					//'assets/components/foundation/js/foundation/foundation.accordion.js',
					//'assets/components/foundation/js/foundation/foundation.alert.js',
					//'assets/components/foundation/js/foundation/foundation.clearing.js',
					//'assets/components/foundation/js/foundation/foundation.dropdown.js',
					'assets/components/foundation/js/foundation/foundation.equalizer.js',
					'assets/components/foundation/js/foundation/foundation.interchange.js',
					//'assets/components/foundation/js/foundation/foundation.joyride.js',
					//'assets/components/foundation/js/foundation/foundation.magellan.js',
					'assets/components/foundation/js/foundation/foundation.offcanvas.js',
					//'assets/components/foundation/js/foundation/foundation.orbit.js',
					'assets/components/foundation/js/foundation/foundation.reveal.js',
					//'assets/components/foundation/js/foundation/foundation.slider.js',
					'assets/components/foundation/js/foundation/foundation.tab.js',
					'assets/components/foundation/js/foundation/foundation.tooltip.js',
					'assets/components/foundation/js/foundation/foundation.topbar.js',

					// Include your own custom scripts (located in the custom folder)
					'assets/javascript/custom/*.js'

				],

				// Finally, concatinate all the files above into one single file
				dest: 'assets/javascript/foundation.js'

			}

		},

		uglify: {

			dist: {
				files: {
					// Shrink the file size by removing spaces
					'assets/javascript/foundation.js': ['assets/javascript/foundation.js'],
				}
			},
			vendors: {
				files: {
					// Shrink the file size by removing spaces
					'assets/javascript/vendor/vendors.js': ['assets/javascript/vendor/vendors.js']
				}
			}

		},

		watch: {
			grunt: {files: ['Gruntfile.js']},

			sass: {
				files: 'assets/scss/**/*.scss',
				tasks: ['sass'],
				options: {
					//livereload: true
				}
			},
			
			coffee: {
				files: 'assets/javascript/custom/**/*.coffee',
				tasks: ['coffee'],
				options: {
				}
			},

			js: {
				files: 'assets/javascript/custom/**/*.js',
				tasks: ['concat:dist'],
				options: {
					//livereload: true
				}
			}

		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-compress');
  //grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('package', ['compress:main']);
	grunt.registerTask('build', ['sass', 'coffee', 'concat:dist', 'concat:vendors', 'uglify:dist', 'uglify:vendors', 'imagemin', 'htmlmin']);
	grunt.registerTask('default', ['watch']);
};