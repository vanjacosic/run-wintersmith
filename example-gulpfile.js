//
// Example gulpfile for use with Wintersmith
//
// 'gulp watch' runs preview mode with a local server and refreshes the browser
// when Markdown or Jade files are modified. Requires Livereload for Chrome.
//
// 'gulp build' builds the site to the default folder.

// Include gulp
var gulp = require('gulp');
var gutil = require('gulp-util');

// Include plugins
var clean = require('gulp-rimraf');
var refresh = require('gulp-livereload');
var runWintersmith = require('run-wintersmith');
var lr = require('tiny-lr');
var server = lr();

//
// Directories
//
var BUILD_DIR = 'build';
var CONTENT_DIR = 'contents';
var TEMPLATES_DIR = 'templates';

//
// Helper task - Cleans everything in build dir
//
gulp.task('clean', function() {
    return gulp.src(BUILD_DIR, { read: false }).pipe(clean());
});

//
// Helper task - Starts Livereload server
//
gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) { return console.log(err); }
    });
});

//
// Helper task - Tells Livereload to refresh
//
gulp.task('refresh-browser', function() {
    gulp.src('config.json', {read: false})
        .pipe(refresh(server));
});

//
// Build task
//
gulp.task('build', ['clean'], function(cb) {
    // Tell Wintersmith to build
    runWintersmith.build(function(){
        // Log on successful build
        gutil.log('Wintersmith has finished building!');

        // Tell gulp task has finished
        cb();
    });
});

//
// Preview task
//
gulp.task('preview', function() {
    // Tell Wintersmith to run in preview mode
    runWintersmith.preview();
});

//
// Watch task
//
gulp.task('watch', ['preview-site', 'lr-server'], function(){
    function reportChange(e) {
        gutil.log(gutil.template('File <%= file %> was <%= type %>, rebuilding...', {
            file: gutil.colors.cyan(e.path),
            type: e.type
        }));
    }

    // Watch Jade template files
    gulp.watch(TEMPLATES_DIR + '/**', ['refresh-browser'])
    .on('change', reportChange);

    // Watch Markdown files
    gulp.watch(CONTENT_DIR + '/**', ['refresh-browser'])
    .on('change', reportChange);
});
