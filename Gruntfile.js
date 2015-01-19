

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'src/inherit.js'
                ],
                dest: 'lib/<%= pkg.name %>.js'
            }
        },
        uglify: {
            build: {
                src: 'src/inherit.js',
                dest: 'lib/inherit.min.js'
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);



};
