var gulp = require('gulp');
var minifyHTML = require('gulp-htmlmin');
var plumber = require('gulp-plumber');

gulp.task('html', ['generate-index'], function () {
 
  gulp.src(['./app/**/*.html', '!./app/index.html'])
    .pipe(plumber())
    .pipe(minifyHTML())
    .pipe(gulp.dest('./build/'))
});

gulp.task('generate-index', function () {
  gulp.src('./app/index.html')
    .pipe(plumber())
    .pipe(minifyHTML())
    .pipe(gulp.dest('./build/'))
});
