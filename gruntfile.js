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

  // register basic task
  // When a basic task is run, Grunt doesn't look at the configuration or environment
  // it just runs the specified task function

  grunt.registerTask(
    "foo",
    "A sample task that logs stuff.",
    function (arg1, arg2) {
      if (arguments.length === 0) {
        grunt.log.writeln(this.name + ", no args");
      } else {
        grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
      }
    }
  );

  // register custom tasks
  grunt.registerTask("foo", 'My "foo" task.', function () {
    // Enqueue "bar" and "baz" tasks, to run after "foo" finishes, in-order.
    grunt.task.run("bar", "baz");
    // Or:
    grunt.task.run(["bar", "baz"]);
  });

  // register asynchronous tasks
  grunt.registerTask("asyncfoo", 'My "asyncfoo" task.', function () {
    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();
    // Run some sync stuff.
    grunt.log.writeln("Processing task...");
    // And some async stuff.
    setTimeout(function () {
      grunt.log.writeln("All done!");
      done();
    }, 1000);
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
