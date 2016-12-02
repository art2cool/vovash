/*
Gulp configuration file
—--------------------------
run 'gulp test' - to run mocha tests
*/
'use strict';
const gulp = require('gulp'),
      mocha = require('gulp-mocha'),
      gutil = require('gutil');
/*
    Task to run tests with mocha
*/
gulp.task('test', [ 'watch-mocha']);

gulp.task('mocha', () => {
    return gulp.src(['./test/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', gutil.log);
});
gulp.task('mocha', () => {
    return gulp.src(['./test/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', gutil.log);
});
gulp.task('watch-mocha', () => {
    gulp.run('mocha');
    gulp.watch(['./**/*.js', 'test/**/*.js'], ['mocha'])
});
