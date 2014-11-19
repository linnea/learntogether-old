module.exports = function (grunt) {  
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.  
    grunt.initConfig({  
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
       		target_css: {
       			options: {  
                    banner: '/* Learn Together minified css file */'  
                },  
                files: {  
                    'client/private/assets/css/learn_together.min.css': [  
                        // source files  
               		]  
                }
       		}
        },
        uglify: {
        	target_js: {
        		options: {
        			compress: true,
        			banner: '/* Learn Together minified JS file */'
        		},
        		learn_together: {
        			src: [],
        			dest: 'client/private/assets/'
        		}
        	}
        }
    });
    // Default task.  
    grunt.registerTask('default', ['uglify', 'cssmin']);

};