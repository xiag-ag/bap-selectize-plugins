'use strict';

var gulp = require('gulp');

gulp.task('css-src', function () {
    var less = require('gulp-less');

    return gulp.src(__dirname + '/src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest(__dirname + '/dist/css'));
});
gulp.task('css-min', function () {
    var less = require('gulp-less'),
        minify = require('gulp-minify-css'),
        rename = require('gulp-rename');

    return gulp.src(__dirname + '/src/css/*.less')
        .pipe(less())
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(__dirname + '/dist/css'));
});

gulp.task('js-src', function () {
    return gulp.src(__dirname + '/src/js/*.js')
        .pipe(gulp.dest(__dirname + '/dist/js'));
});
gulp.task('js-min', function () {
    var uglify = require('gulp-uglify'),
        rename = require('gulp-rename');

    return gulp.src(__dirname + '/src/js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(__dirname + '/dist/js'));
});

gulp.task('css', ['css-src', 'css-min']);
gulp.task('js', ['js-src', 'js-min']);

gulp.task('watch', ['css', 'js'], function () {
    gulp.watch(__dirname + '/src/css/*.less', ['css']);
    gulp.watch(__dirname + '/src/js/*.js', ['js']);
});

gulp.task('server', ['watch'], function () {
    var connect = require('gulp-connect');

    connect.server({
        root: '.',
        port: 9000
    });
});


gulp.task('build', ['css', 'js']);
gulp.task('default', ['build']);