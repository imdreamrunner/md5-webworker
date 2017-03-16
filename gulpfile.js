const gulp = require('gulp');
const ts = require("gulp-typescript");
const merge2 = require("merge2");
const amdclean = require("gulp-amdclean");
const Server = require('karma').Server;
const webserver = require("gulp-webserver");
const replace = require('gulp-replace');
const fs = require('fs');
const concat =  require('gulp-concat');

const sparkMd5 = fs.readFileSync('sparkMd5.js');

gulp.task('build-commonjs', () => {
  // Build CommonJS library.
  const tsProject = ts.createProject("tsconfig.json", {
      module: "commonjs"
    });
  const tsResult = tsProject.src().pipe(tsProject());
  return merge2([
    tsResult.js.pipe(replace(/__SPARK_MD5__/g, sparkMd5)).pipe(gulp.dest("dist/commonjs")),
    tsResult.dts.pipe(gulp.dest("dist/commonjs"))
  ]);
});


gulp.task("build-amd", function () {
  // Build CommonJS library.
  var tsProject = ts.createProject("tsconfig.json", {
    module: "amd",
    outFile: "md5-webworker.js"
  });
  var tsResult = tsProject.src().pipe(tsProject());
  return merge2([
    tsResult.js.pipe(replace(/__SPARK_MD5__/g, sparkMd5)).pipe(gulp.dest("dist/amd")),
    tsResult.dts.pipe(gulp.dest("dist/amd"))
  ]);
});

gulp.task("build-browser-single", ["build-amd"], function () {
  // Build library for browser.
  return gulp
    .src(["dist/amd/md5-webworker.js"])
    .pipe(amdclean.gulp({
      prefixMode: "standard",
      wrap: {
        // This string is prepended to the file
        start: ";(function(global, file_worker) {\n",
        // This string is appended to the file
        end: "\nglobal.md5_webworker=src_index.default;}(window, {default: FileWorker}));"
      }
    }))
    .pipe(gulp.dest("dist/browser-single"));
});


gulp.task("build-browser", ["build-browser-single"], function () {
  return gulp.src(["node_modules/file-worker/dist/browser/FileWorker.js", "dist/browser-single/md5-webworker.js"])
    .pipe(concat('md5-webworker.js'))
    .pipe(gulp.dest("dist/browser"));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  }).start();
});

gulp.task('test-watch', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, () => done()).start();
});

gulp.task("webserver", () => {
  gulp.src(".")
  .pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: true
  }));
});

gulp.task('build', ['build-commonjs', 'build-browser']);

gulp.task('default', ['build']);
