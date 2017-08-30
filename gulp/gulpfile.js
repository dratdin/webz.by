'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  pug = require('gulp-pug'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create();

browserSync.init({
  server: {
    baseDir: '../'
  },
  notify: false
});

gulp.task('pug', function buildHTML() {
  return gulp.src('../views/**/*.pug')
  .pipe(pug({}))
  .pipe(gulp.dest('../'))
  .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  return gulp.src('../assets/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('../public/css'))
    .pipe(browserSync.stream());
});

gulp.task('compress_js', function () {
  gulp.src('../assets/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../public/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('../views/**/*.pug', ['pug']);
  gulp.watch('../assets/**/*.scss', ['sass']);
  gulp.watch('../assets/**/*.js', ['compress_js']);
  gulp.watch("../*.html").on('change', browserSync.reload);
});
