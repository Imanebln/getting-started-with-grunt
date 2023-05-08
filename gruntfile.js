module.exports = function (grunt) {
  // project config
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      build: {
        src: "js/index.js",
        dest: "js/index.min.js",
      },
    },
    watch: {
      scripts: {
        files: ["js/index.js", "css/style.css"],
        tasks: ["uglify", "cssmin"],
      },
    },
    cssmin: {
      my_target: {
        files: [
          {
            expand: true,
            cwd: "css/",
            src: ["*.css", "!*.min.css"],
            dest: "css/",
            ext: ".min.css",
          },
        ],
      },
    },
    imagemin: {
      dynamic: {
        options: {
          progressive: true,
        },
        files: [
          {
            expand: true,
            cwd: "images/",
            src: ["**/*.{svg,png,jpg,jpeg,gif,webp}"],
            dest: "dest/",
          },
        ],
      },
    },
    log: {
      foo: [1, 2, 3],
      bar: "hello world",
      baz: false,
    },
  });

  // register multi task
  grunt.registerMultiTask("log", "Log stuff.", function () {
    grunt.log.writeln(this.target + ": " + this.data);
  });

  // load plugin that provide "uglify" task
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // load plugin that provide "minify css" task
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  // load plugin that provide "minify images" task
  grunt.loadNpmTasks("grunt-contrib-imagemin");

  // load plugin that provide "watch" task
  grunt.loadNpmTasks("grunt-contrib-watch");

  // default tasks
  grunt.registerTask("default", ["uglify"]);
};
