'use strict';

var gulp = require('gulp');

gulp.task('less', function () {
    var less = require('gulp-less');

    return gulp.src('css/*.less')
        .pipe(less())
        .pipe(gulp.dest('css/'));
});

gulp.task('watch', ['less'], function () {
    gulp.watch('css/*.less', ['less']);
});

gulp.task('server', ['watch'], function () {
    var connect = require('gulp-connect');

    connect.server({
        root: '.',
        port: 9000
    });
});


gulp.task('build', ['less']);
gulp.task('default', ['build']);