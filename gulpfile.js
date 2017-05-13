var gulp = require('gulp'), sass = require("gulp-sass"), concat = require('gulp-concat'), uglify = require('gulp-uglify'), runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

var browserSync = require('browser-sync').create();
var env = 'dev';

var config = require('./gulp/config');
var WEBAPP_DIR = config.webappDir;
var BUILD_DIR = config.buildDir;
var UTIL_DIR = WEBAPP_DIR + "js/util/";
var CONTROLLER_DIR = WEBAPP_DIR + "js/controller/";
var DIRECTIVE_DIR = WEBAPP_DIR + "js/directive/";
// Static server
gulp.task('browser-sync', function () {
    var built_ui = BUILD_DIR + "ui/**";
    var built_css = BUILD_DIR + "css/**";
    var built_js = BUILD_DIR + "js/**";
    var files = [built_ui, built_css, built_js]
    browserSync.init({
        "files": files,
        "notify": false,
        server: {
            baseDir: "."
        }
    });
});

gulp.task('my-watch', function () {

    gulp.watch(WEBAPP_DIR + 'ui/**').on('change', function () {
        gulp.run(['build-ui']);
    });
    gulp.watch(WEBAPP_DIR + 'scss/**').on('change', function () {
        gulp.run(['build-sass']);
    });

    gulp.watch(WEBAPP_DIR + 'js/**').on('change', function () {
        gulp.run(['build-js']);
    });
});
gulp.task('build-js', function () {
    var module = WEBAPP_DIR + "js/module.js";
    var all_utils = UTIL_DIR + "**";
    var all_controller = CONTROLLER_DIR + "**";
    var all_directive = DIRECTIVE_DIR + "**";
    return gulp.src([module, all_utils, all_controller, all_directive]).pipe(
        concat('app.js')).pipe(gulp.dest(BUILD_DIR + 'js'));
});
gulp.task('minify-js', function () {
    var built_js = BUILD_DIR + "js/**";

   return gulp.src(built_js)
        .pipe(uglify()).pipe(gulp.dest(BUILD_DIR + "js"));
});
gulp.task('build-sass', function () {
    function handleError(e) {
        console.log("error while compiling SCSS" + e);
        this.emit('end');
    }

    return gulp.src(WEBAPP_DIR + 'scss/**/*.scss').pipe(sass()).on('error',
        handleError).pipe(concat('style.css')).pipe(
        gulp.dest(BUILD_DIR + 'css'));
});
gulp.task('minify-css', function () {
    var built_css = BUILD_DIR + "css/**";

    return gulp.src(built_css)
        .pipe(cleanCSS()).pipe(gulp.dest(BUILD_DIR + "css"));
});
gulp.task('build-ui', function () {

    return gulp.src(WEBAPP_DIR + 'ui/**').pipe(gulp.dest(BUILD_DIR + 'ui'));
});
gulp.task('minify-ui', function () {
    var built_ui = BUILD_DIR + "ui/**";

    return gulp.src(built_ui).pipe(htmlmin({collapseWhitespace: true})).pipe(gulp.dest(BUILD_DIR + 'ui'));
});
gulp.task('set-qa-env', function () {
    env = 'qa';
    console.log('set-qa-env: ' + env);
});
gulp.task('set-prod-env', function () {
    env = 'prod';
    console.log('set-prod-env: ' + env);
});
gulp.task('default', ['my-watch', 'browser-sync']);
gulp.task('build', ['build-sass', 'build-js', 'build-ui']);

gulp.task('build-qa', function () {
    runSequence('build-js', 'minify-js','build-sass','minify-css','build-ui','minify-ui');
});