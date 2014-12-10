module.exports = function (grunt) {  
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.  
    grunt.initConfig({  
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            compile: {
                
                files: {
                    'client/private/assets/css/styles.css': 'client/private/assets/styl/styles.styl', // 1:1 compile
                    
                }
            }
        },
        cssmin: {
       		target_css: {
       			options: {  
                    banner: '/* Learn Together minified css file */'  
                },  
                files: {  
                    'client/private/assets/css/learn_together.min.css': [  
                        // source files  
                        'client/private/assets/css/*.css', '!client/private/assets/css/learn_together.min.css'
               		]  
                }
       		}
        },
        concat: {
            
            mainFile: {
                files: {
                    'client/private/apps/main/learn_together_main.js': ['client/private/apps/common/**/*.js', 'client/private/apps/main/**/*.js', '!client/private/apps/main/learn_together_main.js', '!client/private/apps/main/learn_together_main.min.js']
                }    
            }
            
        },
        uglify: {
        	target_js: {
        		options: {
        			compress: true,
        			banner: '/* Learn Together minified JS file */'
        		},
        		files: {
        			'client/private/apps/main/learn_together_main.min.js': ['client/private/apps/main/learn_together_main.js']
        		}
        	}
        }
    });
    // Default task.  
    grunt.registerTask('default', ['stylus', 'concat', 'uglify', 'cssmin']);

};