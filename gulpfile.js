'use strict';

/* global __dirname*/

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

gulp.task('example-css', function () {
    var less = require('gulp-less');

    return gulp.src(__dirname + '/example/css/*.less')
        .pipe(less())
        .pipe(gulp.dest(__dirname + '/example/css'));
});
gulp.task('example-watch', ['example-css'], function () {
    gulp.watch(__dirname + '/example/css/*.less', ['example-css']);
});
gulp.task('example-link-vendors', function () {
    var symlink = require('gulp-symlink');

    return gulp.src(__dirname + '/bower_components/')
        .pipe(symlink(__dirname + '/example/vendors', {force: true}));
});
gulp.task('example-link-plugin', function () {
    var symlink = require('gulp-symlink');

    return gulp.src(__dirname + '/dist/')
        .pipe(symlink(__dirname + '/example/plugin', {force: true}));
});
gulp.task('example-server', ['example-watch', 'example-link-vendors', 'example-link-plugin'], function () {
    var connect = require('gulp-connect');

    connect.server({
        root: __dirname + '/example',
        port: 9000
    });
});


gulp.task('example', ['example-server']);
gulp.task('build', ['css', 'js']);

gulp.task('default', ['build']);